import { useMutation } from '@tanstack/react-query';
import { recordService } from '../../services/recordService';
import type { UseRecordCreateOptions, UseRecordCreateReturn } from './types';

/**
 * @hook useRecordCreate
 * @summary Hook for creating new records with validation and error handling
 * @domain record
 * @type domain-hook
 * @category data
 *
 * @parameters
 * @param {Object} options - Hook parameters
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 *
 * @returns {Object} Hook return object
 * @returns {Function} returns.create - Function to create record
 * @returns {boolean} returns.isCreating - Loading state
 * @returns {Error|null} returns.error - Error state
 */
export const useRecordCreate = (options: UseRecordCreateOptions = {}): UseRecordCreateReturn => {
  const { onSuccess, onError } = options;

  const mutation = useMutation({
    mutationFn: recordService.create,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });

  return {
    create: mutation.mutateAsync,
    isCreating: mutation.isPending,
    error: mutation.error,
  };
};
