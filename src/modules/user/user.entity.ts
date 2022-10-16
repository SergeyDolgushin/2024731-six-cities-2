import {UserType} from '../../types/user-type.js';
import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';
import { createSHA256 } from '../../utils/common.js';

const {prop, modelOptions} = typegoose;
const DEFAULT_AVATAR_IMG = './resourses/img/user01.png';

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})

export class UserEntity extends defaultClasses.TimeStamps implements UserType {
  constructor(data: UserType) {
    super();

    this.email = data.email;
    this.avatarUrl = data.avatarUrl;
    this.name = data.name;
    this.isPro = data.isPro;
    this.favorites = [];
  }

  @prop({ unique: true, required: true })
  public email!: string;

  @prop({required: true, default: DEFAULT_AVATAR_IMG})
  public avatarUrl!: string;

  @prop({required: true, default: ''})
  public name!: string;

  @prop({required: true, default: ''})
  private password!: string;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }

  @prop()
  public isPro!: boolean;

  @prop({
    required: true,
    default: [],
  })
  public favorites!: string[];
}

export const UserModel = getModelForClass(UserEntity);
