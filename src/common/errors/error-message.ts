import {StatusCodes} from 'http-status-codes';
import HttpError from '../../common/errors/http-error.js';

export const sendUnauthError = () => {
  throw new HttpError(
    StatusCodes.UNAUTHORIZED,
    'You are not logged in or you do not have permission to this page.',
  );
};


export const objectNotExist = (info: string) => {
  throw new HttpError(
    StatusCodes.NOT_ACCEPTABLE,
    `Offer "${info}" not exists.`,
  );
};
