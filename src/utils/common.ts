import * as jose from 'jose';
import crypto from 'crypto';
import {plainToInstance} from 'class-transformer';
import {ClassConstructor} from 'class-transformer/types/interfaces/class-constructor.type.js';
import { OfferType } from '../types/offer-type.js';

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

export const createErrorObject = (message: string) => ({
  error: message,
});

export const createJWT = async (algoritm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({ alg: algoritm})
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));
