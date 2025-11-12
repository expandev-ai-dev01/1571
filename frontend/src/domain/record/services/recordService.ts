import { authenticatedClient } from '@/core/lib/api';
import type { Record, CreateRecordDto } from '../types';

/**
 * @service recordService
 * @summary Record management service for authenticated endpoints
 * @domain record
 * @type rest-service
 * @apiContext internal
 *
 * @description
 * All methods in this service use authenticatedClient which targets:
 * /api/v1/internal/record/...
 *
 * Authentication token is automatically added by interceptor.
 */
export const recordService = {
  /**
   * @endpoint POST /api/v1/internal/record
   * @summary Creates new record
   */
  async create(data: CreateRecordDto): Promise<Record> {
    const response = await authenticatedClient.post('/record', data);
    return response.data.data;
  },
};
