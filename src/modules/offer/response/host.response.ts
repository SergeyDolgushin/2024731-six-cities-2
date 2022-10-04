import {Expose} from 'class-transformer';

export class HostResponse {
  @Expose()
  public avatarUrl!: string;

  @Expose()
  public email!: string;

  @Expose()
  public isPro!: boolean;

  @Expose()
  public name!: string;

}
