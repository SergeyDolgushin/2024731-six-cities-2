import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import {OffersResponse} from './response/offers.response.js';
import {OfferResponse} from './response/offer.response.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import {fillDTO} from '../../utils/common.js';
import { objectNotExist, sendUnauthError } from '../../common/errors/error-message.js';

@injectable()
export default class OfferController extends Controller {
  constructor(
      @inject(Component.LoggerInterface) logger: LoggerInterface,
      @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/:offersId', method: HttpMethod.Get, handler: this.getByOfferId});
    this.addRoute({path: '/:cityName/premium', method: HttpMethod.Get, handler: this.getPremiumOffer});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/:offersId', method: HttpMethod.Patch, handler: this.changeOffer});
    this.addRoute({path: '/:offersId', method: HttpMethod.Delete, handler: this.deleteOffer});
  }

  public async index(req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find(String(req.query['offersCount']));
    const offersResponse = fillDTO(OffersResponse, offers);
    this.ok(res, offersResponse);
  }

  public async getByOfferId(req: Request, res: Response): Promise<void> {
    const offer = await this.offerService.findByOfferId(req.params['offersId']);
    const offerResponse = fillDTO(OfferResponse, offer);
    this.ok(res, offerResponse);
  }

  public async getPremiumOffer(req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findPremiumOffers(String(req.params['cityName']));
    const offersResponse = fillDTO(OffersResponse, offers);
    this.ok(res, offersResponse);
  }

  public async create(
    {headers, body}: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response): Promise<void> {

    if (!headers['x-auth']) {
      sendUnauthError();
    }

    const result = await this.offerService.create(body);
    this.created(
      res,
      fillDTO(OfferResponse, result)
    );
  }

  public async changeOffer(
    {params, body}: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response): Promise<void> {
    const offerId = String(params['offersId']);
    const existOffer = await this.offerService.findByOfferId(offerId);

    if (!existOffer) {
      objectNotExist(offerId);
    }

    const result = await this.offerService.updateById(String(params['offersId']), body);
    this.created(
      res,
      fillDTO(OfferResponse, result)
    );
  }

  public async deleteOffer(req: Request, res: Response): Promise<void> {
    const offerId = String(req.params['offersId']);
    const existOffer = await this.offerService.findByOfferId(offerId);

    if (!existOffer) {
      objectNotExist(offerId);
    }

    const offer = await this.offerService.deleteById(req.params['offersId']);
    this.noContent(res, offer);
  }
}
