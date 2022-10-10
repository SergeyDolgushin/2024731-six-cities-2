import {Expose, Type} from 'class-transformer';
import UserResponse from '../../user/response/user.response.js';

export default class CommentResponse {
  @Expose()
  public rating!: string;

  @Expose({ name: 'date'})
  public createdAt!: string;

  @Expose({ name: 'text'})
  public comment!: string;

  @Expose({ name: 'hostId'})
  @Type(() => UserResponse)
  public user!: UserResponse;
}
