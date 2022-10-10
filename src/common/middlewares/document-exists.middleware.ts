import {MiddlewareInterface} from '../../types/middleware.interface.js';
import {NextFunction, Request, Response} from 'express';
import {DocumentExistsInterface} from '../../types/document-exists.interface.js';
import HttpError from '../errors/http-error.js';
import {StatusCodes} from 'http-status-codes';

export class DocumentExistsMiddleware implements MiddlewareInterface {
  constructor(
    private readonly service: DocumentExistsInterface,
    private readonly entityName: string,
    private readonly paramName: string,
    private readonly paramType: boolean,
  ) {}

  public async execute({params, body}: Request, _res: Response, next: NextFunction): Promise<void> {
    const documentId = this.paramType ? body[this.paramName] : params[this.paramName];

    if (!await this.service.exists(documentId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `${this.entityName} with ${documentId} not found.`,
        'DocumentExistsMiddleware'
      );
    }

    next();
  }
}
