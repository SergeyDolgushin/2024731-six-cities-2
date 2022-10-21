import * as jose from 'jose';
import crypto from 'crypto';
import {plainToInstance, ClassConstructor} from 'class-transformer';
import {ValidationError} from 'class-validator';
import { OfferType } from '../types/offer-type.js';
import {ValidationErrorField} from '../types/validation-error-field.type.js';
import {ServiceError} from '../types/service-error.enum.js';

const getBooleanValue = (input: string):boolean => input === 'true';

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [price, rating, images, title, id, isFavorite, isPremium, type, previewImage,
    latitude, longitude, cityName, cityLatitude, cityLongtitude, goods, maxAdults,
    hostName, hostEmail, hostPassword, hostAvatar, hostIsPro, description, bedrooms,
    commentsCount, createdDate] = tokens;

  return {
    price: Number(price),
    rating: Number(rating),
    images: images.split(';'),
    title,
    offerId: Number(id),
    isFavorite: getBooleanValue(isFavorite),
    isPremium: getBooleanValue(isPremium),
    type,
    previewImage,
    location: {
      latitude: Number(latitude),
      longitude: Number(longitude)
    },
    city: {
      name: cityName,
      location: {
        latitude: Number(cityLatitude),
        longitude: Number(cityLongtitude)
      }
    },
    goods: goods.split(';'),
    maxAdults: Number(maxAdults),
    host: {
      name: hostName,
      email: hostEmail,
      password: hostPassword,
      avatarUrl: hostAvatar,
      isPro: getBooleanValue(hostIsPro),
    },
    description,
    bedrooms: Number(bedrooms),
    commentsCount: Number(commentsCount),
    createdDate: new Date(createdDate),
  } as OfferType;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (serviceError: ServiceError, message: string, details: ValidationErrorField[] = []) => ({
  errorType: serviceError,
  message,
  details: [...details]
});

export const createJWT = async (algoritm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({ alg: algoritm})
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));

export const transformErrors = (errors: ValidationError[]): ValidationErrorField[] =>
  errors.map(({property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  })
  );

export const getFullServerPath = (host: string, port: number) => `http://${host}:${port}`;
