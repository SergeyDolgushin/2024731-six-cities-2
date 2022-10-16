import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import * as core from 'express-serve-static-core';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import {OffersResponse} from './response/offers.response.js';
import {OfferResponse} from './response/offer.response.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import {fillDTO} from '../../utils/common.js';
import {CommentServiceInterface} from '../comments/comment-service.interface.js';
import CommentResponse from '../comments/response/comment.response.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import {DocumentExistsMiddleware} from '../../common/middlewares/document-exists.middleware.js';
import { CityServiceInterface } from '../city/city-service.interface.js';
import {PrivateRouteMiddleware} from '../../common/middlewares/private-route.middleware.js';

type ParamsGetOffer = {
  offersId: string;
}

@injectable()
export default class OfferController extends Controller {
  constructor(
      @inject(Component.LoggerInterface) logger: LoggerInterface,
      @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
      @inject(Component.CityServiceInterface) private readonly cityService: CityServiceInterface,
      @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/:offersId',
      method: HttpMethod.Get,
      handler: this.getByOfferId,
      middlewares: [
        new ValidateObjectIdMiddleware('offersId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offersId', false)
      ]
    });
    this.addRoute({
      path: '/:cityName/premium',
      method: HttpMethod.Get,
      handler: this.getPremiumOffer,
      middlewares: [
        new ValidateObjectIdMiddleware('cityName'),
        new DocumentExistsMiddleware(this.cityService, 'City', 'cityName', false),
      ]
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)]
    });
    this.addRoute({
      path: '/:offersId',
      method: HttpMethod.Patch,
      handler: this.changeOffer,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offersId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offersId', false)
      ]
    });
    this.addRoute({
      path: '/:offersId',
      method: HttpMethod.Delete,
      handler: this.deleteOffer,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offersId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offersId', false)
      ]
    });
    this.addRoute({
      path: '/:offersId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offersId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offersId', false),
      ]
    });
  }

  public async index(req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find(String(req.query['offersCount']));
    offers.forEach((offer) => {
      offer.uid = String(req.user.id);
    });
    const offersResponse = fillDTO(OffersResponse, [...offers]);
    this.ok(res, offersResponse);
  }

  public async getByOfferId(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer, object, object>,
    res: Response): Promise<void> {
    const offer = await this.offerService.findByOfferId(params.offersId);
    const offerResponse = fillDTO(OfferResponse, offer);
    this.ok(res, offerResponse);
  }

  public async getPremiumOffer(req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findPremiumOffers(String(req.params['cityName']));
    const offersResponse = fillDTO(OffersResponse, offers);
    this.ok(res, offersResponse);
  }

  public async create(
    {body, user}: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response): Promise<void> {

    const result = await this.offerService.create({...body, hostId: user.id});
    this.created(
      res,
      fillDTO(OfferResponse, result)
    );
  }

  public async changeOffer(
    {params, body}: Request<Record<string, unknown>, Record<string, unknown>, UpdateOfferDto>,
    res: Response): Promise<void> {
    const result = await this.offerService.updateById(String(params['offersId']), body);
    this.created(
      res,
      fillDTO(OfferResponse, result)
    );
  }

  public async deleteOffer({params}: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    const {offersId} = params;
    const offer = await this.offerService.deleteById(offersId);
    this.noContent(res, offer);
  }

  public async getComments(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer, object, object>,
    res: Response
  ): Promise<void> {

    const comments = await this.commentService.findByOfferId(params.offersId);
    this.ok(res, fillDTO(CommentResponse, comments));
  }
}
