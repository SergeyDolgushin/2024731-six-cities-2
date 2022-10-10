import {Request, Response} from 'express';
import {inject} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {CommentServiceInterface} from './comment-service.interface.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import {OfferServiceInterface} from '../offer/offer-service.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {fillDTO} from '../../utils/common.js';
import CommentResponse from './response/comment.response.js';
import {ValidateDtoMiddleware} from '../../common/middlewares/validate-dto.middleware.js';
import HttpError from '../../common/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

export default class CommentController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(Component.OfferServiceInterface) private  readonly offerService: OfferServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateCommentDto)
      ]
    });
  }

  public async create(
    {body}: Request<object, object, CreateCommentDto>,
    res: Response
  ): Promise<void> {

    if (!await this.offerService.findByOfferId(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with ID: ${body.offerId} - not found`,
        'CommentOffer',
      );
    }

    const comment = await this.commentService.create(body);
    await this.offerService.changeCommentCountAndRating(body.offerId, Number(body.rating));
    this.created(res, fillDTO(CommentResponse, comment));
  }
}
