import { readFileSync } from 'fs';
import { cities } from '../const/city-const.js';
import { OfferType, CityType } from '../types/offer-type.js';
import { FileReaderInterface } from './file-reader.interface.js';

const makeCityField = (name: string)  =>
  cities.filter((city: CityType) => city.name === name);

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): OfferType[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map((item) => ({
        price: Number(item[0]),
        rating: Number(item[1]),
        images: item[2].split(';'),
        title: item[3],
        id: Number(item[4]),
        isFavorite: Boolean(item[5]),
        isPremium: Boolean(item[6]),
        type: item[7],
        previewImage: item[8],
        location: {
          latitude: Number(item[9]),
          longitude: Number([item[10]])
        },
        city: makeCityField(item[11])[0],
        goods: item[14].split(';'),
        maxAdults: Number(item[15]),
        host: {
          name: item[16],
          email: item[17],
          password: item[18],
          avatarUrl: item[19],
          isPro: Boolean(item[20])
        },
        description: item[21],
        bedrooms: Number(item[22]),
        commentsCount: Number(item[23]),
      }));
  }
}


