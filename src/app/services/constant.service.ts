import {Injectable} from '@angular/core';
import { API_URL } from '../../environments/environment';

@Injectable()
export class ConstantService {

API_ENDPOINT :string;
ADDRESS_RES: string;
BUSINESS_RES: string;

constructor() {
    this.API_ENDPOINT = API_URL;
    this.ADDRESS_RES = 'addresses'
    this.BUSINESS_RES = 'businesses'
  }
}