import dayjs from 'dayjs';
import { cities } from '../../const/city-const.js';
import { MockType } from '../../types/mock-data.type.js';
import { CityType } from '../../types/offer-type.js';
import { generateRandomValue, getRandomBoolean, getRandomItem, getRandomItems } from '../../utils/random.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_RATING = 1;
const MAX_RATING = 5;
const NUM_AFTER_DIGIT = 1;

const MIN_ADULTS = 1;
const MAX_ADULTS = 10;

const MIN_ROOMS = 1;
const MAX_ROOMS = 8;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_COMMENTS_COUNT = 1;
const MAX_COMMENTS_COUNT = 100;

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

const makeCityField = (name: string)  =>
  cities.filter((city: CityType) => city.name === name);

export default class OfferGenerator implements OfferGeneratorInterface {
  _count = 1;

  constructor(private readonly mockData: MockType) {}

  public generate(): string {
    const randomCity = makeCityField(getRandomItem(CITIES))[0];

    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, NUM_AFTER_DIGIT);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const title = getRandomItem<string>(this.mockData.titles);
    const id = Number(this.mockData.id) + this._count;
    const isFavorite = getRandomBoolean();
    const isPremium = getRandomBoolean();
    const description = getRandomItem<string>(this.mockData.descriptions);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const latitude = (randomCity.location.latitude + Number(Math.random())).toFixed(6);
    const longitude = (randomCity.location.longitude + Number(Math.random())).toFixed(6);
    const city = randomCity.name;
    const cityLatitude = randomCity.location.latitude;
    const cityLongtitude = randomCity.location.longitude;
    const type = getRandomItem<string>(this.mockData.types);
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const hostName = getRandomItem<string>(this.mockData.hostName);
    const hostEmail = getRandomItem<string>(this.mockData.hostEmail);
    const hostPassword = getRandomItem<string>(this.mockData.hostPassword);
    const hostAvatar = getRandomItem<string>(this.mockData.hostAvatar);
    const hostIsPro = getRandomBoolean();
    const maxAdults = generateRandomValue(MIN_ADULTS, MAX_ADULTS);
    const bedrooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS);
    const commentsCount = generateRandomValue(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT);
    const createdDate =  dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();

    this._count++;

    return [
      price, rating, images, title, id, isFavorite, isPremium, type, previewImage,
      latitude, longitude, city, cityLatitude, cityLongtitude, goods,
      maxAdults, hostName, hostEmail, hostPassword, hostAvatar, hostIsPro,
      description, bedrooms, commentsCount, createdDate
    ].join('\t');
  }
}
