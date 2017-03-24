import { RestResource } from './rest.model';
import {Person} from "./person.model";

export class User extends RestResource {
  username: string;
  password: string;
  personId: number;
  accountNonExpired: boolean = true;
  accountNonLocked: boolean = true;
  credentialsNonExpired: boolean = true;
  enabled: boolean = true;
}

export class UserInfo extends RestResource {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  personType: string;
  username: string;
  authorities: string[];
}
