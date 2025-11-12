import type { CreateRecordDto, Record } from '../../types';

export interface UseRecordCreateOptions {
  onSuccess?: (data: Record) => void;
  onError?: (error: Error) => void;
}

export interface UseRecordCreateReturn {
  create: (data: CreateRecordDto) => Promise<Record>;
  isCreating: boolean;
  error: Error | null;
}
