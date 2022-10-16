import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import {StatusCodes} from 'http-status-codes';
import HttpError from '../../common/errors/http-error.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import {DocumentExistsMiddleware} from '../../common/middlewares/document-exists.middleware.js';
import {PrivateRouteMiddleware} from '../../common/middlewares/private-route.middleware.js';
import { fillDTO } from '../../utils/common.js';
import {OffersResponse} from './response/offers.response.js';


@injectable()
export default class OfferFavoriteController extends Controller {
  constructor(
      @inject(Component.LoggerInterface) logger: LoggerInterface,
      @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.getFavoriteOffer,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });
    this.addRoute({
      path: '/:offerId/:status',
      method: HttpMethod.Post,
      handler: this.changeFavoriteStatus,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId', false)
      ]
    });
  }

  public async getFavoriteOffer(req: Request, res: Response): Promise<void> {

    const offers = await this.offerService.findFavorites(String(req.user.id));
    offers.forEach((offer) => {
      offer.uid = String(req.user.id);
    });

    this.ok(res, fillDTO(OffersResponse, offers));
  }

  public async changeFavoriteStatus(req: Request, res: Response): Promise<void> {
    const offerId = req.params['offerId'];
    const newStatus = Number(req.params['status']);
    const userId = String(req.user.id);

    if ((newStatus !== 0 && newStatus !== 1)) {
      throw new HttpError(
        StatusCodes.NOT_ACCEPTABLE,
        'Status must be equal 0 or 1, or city is not exist',
      );
    }

    const offer = await this.offerService.updateFavoriteStatus(offerId, newStatus, userId);
    if (offer) {
      offer.uid = userId;
    }
    this.ok(res, fillDTO(OffersResponse, offer));
  }

}
