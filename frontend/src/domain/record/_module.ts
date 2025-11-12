/**
 * @module record
 * @summary Record management domain for creating, viewing, editing and deleting records
 * @domain functional
 * @dependencies React Hook Form, Zod, TanStack Query
 * @version 1.0.0
 * @author Development Team
 * @lastModified 2024-01-15
 */

export * from './components/RecordForm';
export * from './hooks/useRecordCreate';
export * from './services/recordService';
export * from './types';

export const moduleMetadata = {
  name: 'record',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: ['RecordForm'],
  publicHooks: ['useRecordCreate'],
  publicServices: ['recordService'],
  dependencies: {
    internal: ['@/core/lib/api', '@/core/lib/queryClient'],
    external: ['react', 'react-hook-form', 'zod', '@tanstack/react-query'],
    domains: [],
  },
  exports: {
    components: ['RecordForm'],
    hooks: ['useRecordCreate'],
    services: ['recordService'],
    types: ['Record', 'CreateRecordDto', 'RecordAPIResponse'],
  },
} as const;
