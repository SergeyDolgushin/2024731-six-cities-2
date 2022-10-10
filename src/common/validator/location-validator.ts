import { isLatitude, isLongitude, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { LocationType } from '../../types/offer-type.js';


@ValidatorConstraint({ name: 'Invalid Location', async: false })
export default class LocationValidator implements ValidatorConstraintInterface {
  validate( location: LocationType ) {
    return isLongitude(location.longitude.toString()) && isLatitude(location.latitude.toString());
  }
}
