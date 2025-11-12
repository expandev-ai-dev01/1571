export interface Record {
  idRecord: number;
  title: string;
  dateCreated: string;
}

export interface CreateRecordDto {
  title: string;
}

export interface RecordAPIResponse {
  idRecord: number;
  title: string;
  dateCreated: string;
}
