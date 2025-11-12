import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { recordCreate } from '@/services/record';
import { successResponse, errorResponse } from '@/utils/response';
import { StatusGeneralError } from '@/middleware';
import { HTTP_STATUS } from '@/constants';

/**
 * @api {post} /api/v1/internal/record Create Record
 * @apiName CreateRecord
 * @apiGroup Record
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new record with the specified title
 *
 * @apiParam {String} title Record title (3-100 characters, cannot contain only special characters)
 *
 * @apiSuccess {Number} idRecord Record identifier
 * @apiSuccess {String} title Record title
 * @apiSuccess {String} dateCreated Creation timestamp
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} ServerError Internal server error
 */

const bodySchema = z.object({
  title: z
    .string()
    .min(3, 'titleMinimumThreeCharacters')
    .max(100, 'titleMaximumOneHundredCharacters'),
});

export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validated = bodySchema.parse(req.body);

    const data = await recordCreate({
      idAccount: 1,
      title: validated.title,
    });

    res.status(HTTP_STATUS.CREATED).json(successResponse(data));
  } catch (error: any) {
    if (error.number === 51000) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse(error.message));
    } else if (error.name === 'ZodError') {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('Validation failed', 'VALIDATION_ERROR', error.errors));
    } else {
      next(StatusGeneralError);
    }
  }
}
