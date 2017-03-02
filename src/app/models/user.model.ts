import { RestResource } from './rest.model';

export class UserInfo extends RestResource {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  personType: string;
  username: string;
  authorities: string[];
}
