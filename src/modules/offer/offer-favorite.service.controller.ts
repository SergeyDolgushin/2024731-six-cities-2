import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import {StatusCodes} from 'http-status-codes';
import HttpError from '../../common/errors/http-error.js';
import { sendUnauthError } from '../../common/errors/error-message.js';


@injectable()
export default class OfferFavoriteController extends Controller {
  constructor(
      @inject(Component.LoggerInterface) logger: LoggerInterface,
      @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.getFavoriteOffer});
    this.addRoute({path: '/:offerId/:status', method: HttpMethod.Post, handler: this.changeFavoriteStatus});
  }

  public async getFavoriteOffer(req: Request, res: Response): Promise<void> {
    const token = req.headers['x-auth'];

    if (!token) {
      sendUnauthError();
    }

    const offers = await this.offerService.findFavorites();
    this.ok(res, offers);
  }

  public async changeFavoriteStatus(req: Request, res: Response): Promise<void> {
    const token = req.headers['x-auth'];
    const offerId = req.params['offerId'];
    const newStatus = Number(req.params['status']);
    const existOffer = await this.offerService.findByOfferId(offerId);

    if (!token) {
      sendUnauthError();
    }

    if ((newStatus !== 0 && newStatus !== 1) || !existOffer) {
      throw new HttpError(
        StatusCodes.NOT_ACCEPTABLE,
        'Status must be equal 0 or 1, or city is not exist',
      );
    }

    const offer = await this.offerService.updateFavoriteStatus(offerId, newStatus);
    this.ok(res, offer);
  }

}
