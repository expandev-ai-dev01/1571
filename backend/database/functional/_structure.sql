/**
 * @schema functional
 * Business logic schema for DataFlow application
 */
CREATE SCHEMA [functional];
GO

/**
 * @table record Brief table for storing user records with title and metadata
 * @multitenancy true
 * @softDelete true
 * @alias rec
 */
CREATE TABLE [functional].[record] (
  [idRecord] INTEGER IDENTITY(1, 1) NOT NULL,
  [idAccount] INTEGER NOT NULL,
  [title] NVARCHAR(100) NOT NULL,
  [dateCreated] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [dateModified] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [deleted] BIT NOT NULL DEFAULT (0)
);
GO

/**
 * @primaryKey pkRecord
 * @keyType Object
 */
ALTER TABLE [functional].[record]
ADD CONSTRAINT [pkRecord] PRIMARY KEY CLUSTERED ([idRecord]);
GO

/**
 * @foreignKey fkRecord_Account Multi-tenancy isolation constraint
 * @target subscription.account
 * @tenancy true
 */
ALTER TABLE [functional].[record]
ADD CONSTRAINT [fkRecord_Account] FOREIGN KEY ([idAccount])
REFERENCES [subscription].[account]([idAccount]);
GO

/**
 * @index ixRecord_Account Multi-tenancy filtering index
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixRecord_Account]
ON [functional].[record]([idAccount])
WHERE [deleted] = 0;
GO

/**
 * @index ixRecord_Account_Title Search and uniqueness validation index
 * @type Search
 */
CREATE NONCLUSTERED INDEX [ixRecord_Account_Title]
ON [functional].[record]([idAccount], [title])
INCLUDE ([dateCreated], [dateModified])
WHERE [deleted] = 0;
GO

/**
 * @index uqRecord_Account_Title Unique constraint for title within account
 * @type Search
 * @unique true
 */
CREATE UNIQUE NONCLUSTERED INDEX [uqRecord_Account_Title]
ON [functional].[record]([idAccount], [title])
WHERE [deleted] = 0;
GO