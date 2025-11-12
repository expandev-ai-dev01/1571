import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRecordCreate } from '../../hooks/useRecordCreate';
import type { RecordFormProps, RecordFormData } from './types';

const recordSchema = z.object({
  title: z
    .string()
    .min(3, 'O título deve ter no mínimo 3 caracteres')
    .max(100, 'O título deve ter no máximo 100 caracteres')
    .refine(
      (val) => !/^[^a-zA-Z0-9]+$/.test(val),
      'O título não pode conter apenas caracteres especiais'
    ),
});

/**
 * @component RecordForm
 * @summary Form component for creating new records with validation
 * @domain record
 * @type domain-component
 * @category form
 *
 * @props
 * @param {Function} props.onSuccess - Callback on successful creation
 * @param {Function} props.onCancel - Callback on form cancellation
 *
 * @state
 * - formData: Form input values
 * - errors: Validation errors
 * - isCreating: Submission loading state
 *
 * @styling
 * - Variants: Standard form layout
 * - Responsive: Mobile-first design
 *
 * @accessibility
 * - ARIA: Form labels and error messages
 * - Keyboard: Full keyboard navigation
 */
export const RecordForm = ({ onSuccess, onCancel }: RecordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RecordFormData>({
    resolver: zodResolver(recordSchema),
  });

  const { create, isCreating, error } = useRecordCreate({
    onSuccess: () => {
      reset();
      onSuccess?.();
    },
  });

  const onSubmit = async (data: RecordFormData) => {
    try {
      await create(data);
    } catch (error: unknown) {
      console.error('Failed to create record:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Título do Registro <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          {...register('title')}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          placeholder="Digite o título do registro"
          disabled={isCreating}
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800">
            Erro ao criar registro. Por favor, tente novamente.
          </p>
        </div>
      )}

      <div className="flex gap-3 justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isCreating}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={isCreating}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isCreating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Criando...
            </>
          ) : (
            'Criar Registro'
          )}
        </button>
      </div>
    </form>
  );
};
