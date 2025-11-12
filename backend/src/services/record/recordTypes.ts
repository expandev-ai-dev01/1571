/**
 * @interface RecordCreateRequest
 * @description Request parameters for creating a new record
 *
 * @property {number} idAccount - Account identifier for multi-tenancy
 * @property {string} title - Record title (3-100 characters)
 */
export interface RecordCreateRequest {
  idAccount: number;
  title: string;
}

/**
 * @interface RecordCreateResponse
 * @description Response data after creating a record
 *
 * @property {number} idRecord - Unique record identifier
 * @property {string} title - Record title
 * @property {string} dateCreated - Creation timestamp in ISO format
 */
export interface RecordCreateResponse {
  idRecord: number;
  title: string;
  dateCreated: string;
}

/**
 * @interface RecordEntity
 * @description Represents a record entity in the system
 *
 * @property {number} idRecord - Unique record identifier
 * @property {number} idAccount - Associated account identifier
 * @property {string} title - Record title
 * @property {string} dateCreated - Creation timestamp
 * @property {string} dateModified - Last modification timestamp
 * @property {boolean} deleted - Soft delete flag
 */
export interface RecordEntity {
  idRecord: number;
  idAccount: number;
  title: string;
  dateCreated: string;
  dateModified: string;
  deleted: boolean;
}
