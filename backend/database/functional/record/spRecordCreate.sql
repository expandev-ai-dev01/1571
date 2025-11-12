/**
 * @summary
 * Creates a new record with the specified title for the given account.
 * Validates title requirements including length and character constraints.
 * 
 * @procedure spRecordCreate
 * @schema functional
 * @type stored-procedure
 * 
 * @endpoints
 * - POST /api/v1/internal/record
 * 
 * @parameters
 * @param {INT} idAccount
 *   - Required: Yes
 *   - Description: Account identifier for multi-tenancy isolation
 * 
 * @param {NVARCHAR(100)} title
 *   - Required: Yes
 *   - Description: Title of the record (3-100 characters, cannot be only special characters)
 * 
 * @testScenarios
 * - Valid creation with all required parameters
 * - Title validation: minimum 3 characters
 * - Title validation: maximum 100 characters
 * - Title validation: cannot contain only special characters
 * - Duplicate title handling within same account
 * - Account validation failure
 */
CREATE OR ALTER PROCEDURE [functional].[spRecordCreate]
  @idAccount INTEGER,
  @title NVARCHAR(100)
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @validation Required parameter validation
   * @throw {accountRequired}
   */
  IF @idAccount IS NULL
  BEGIN
    ;THROW 51000, 'accountRequired', 1;
  END;

  /**
   * @validation Required parameter validation
   * @throw {titleRequired}
   */
  IF @title IS NULL OR LTRIM(RTRIM(@title)) = ''
  BEGIN
    ;THROW 51000, 'titleRequired', 1;
  END;

  /**
   * @validation Title minimum length validation
   * @throw {titleMinimumThreeCharacters}
   */
  IF LEN(LTRIM(RTRIM(@title))) < 3
  BEGIN
    ;THROW 51000, 'titleMinimumThreeCharacters', 1;
  END;

  /**
   * @validation Title maximum length validation
   * @throw {titleMaximumOneHundredCharacters}
   */
  IF LEN(@title) > 100
  BEGIN
    ;THROW 51000, 'titleMaximumOneHundredCharacters', 1;
  END;

  /**
   * @validation Title cannot contain only special characters
   * @throw {titleCannotContainOnlySpecialCharacters}
   */
  IF LTRIM(RTRIM(@title)) LIKE '%[^a-zA-Z0-9]%' AND LTRIM(RTRIM(@title)) NOT LIKE '%[a-zA-Z0-9]%'
  BEGIN
    ;THROW 51000, 'titleCannotContainOnlySpecialCharacters', 1;
  END;

  /**
   * @validation Account existence validation
   * @throw {accountDoesntExist}
   */
  IF NOT EXISTS (SELECT * FROM [subscription].[account] acc WHERE acc.[idAccount] = @idAccount)
  BEGIN
    ;THROW 51000, 'accountDoesntExist', 1;
  END;

  /**
   * @validation Duplicate title validation within account
   * @throw {titleAlreadyExists}
   */
  IF EXISTS (
    SELECT * 
    FROM [functional].[record] rec 
    WHERE rec.[idAccount] = @idAccount 
      AND rec.[title] = @title 
      AND rec.[deleted] = 0
  )
  BEGIN
    ;THROW 51000, 'titleAlreadyExists', 1;
  END;

  BEGIN TRY
    /**
     * @rule {fn-record-creation} Create new record with validated title
     */
    BEGIN TRAN;

      DECLARE @idRecord INTEGER;

      INSERT INTO [functional].[record] (
        [idAccount],
        [title],
        [dateCreated],
        [dateModified]
      )
      VALUES (
        @idAccount,
        @title,
        GETUTCDATE(),
        GETUTCDATE()
      );

      SET @idRecord = SCOPE_IDENTITY();

      /**
       * @output {RecordCreated, 1, 1}
       * @column {INT} idRecord
       * - Description: Unique identifier of the created record
       * @column {NVARCHAR} title
       * - Description: Title of the created record
       * @column {DATETIME2} dateCreated
       * - Description: Creation timestamp
       */
      SELECT
        rec.[idRecord],
        rec.[title],
        rec.[dateCreated]
      FROM [functional].[record] rec
      WHERE rec.[idRecord] = @idRecord;

    COMMIT TRAN;
  END TRY
  BEGIN CATCH
    ROLLBACK TRAN;
    THROW;
  END CATCH;
END;
GO