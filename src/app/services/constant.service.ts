import {Injectable} from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ConstantService {

API_ENDPOINT :string;
ADDRESS_RES: string;
BUSINESS_RES: string;
OAUTH_CLIENT_ID: string;
OAUTH_SECRET: string;

constructor() {
    this.API_ENDPOINT = environment.API_URL;
    this.ADDRESS_RES = 'addresses';
    this.BUSINESS_RES = 'businesses';
    this.OAUTH_CLIENT_ID = 'trapps-app';
    this.OAUTH_SECRET = 'QQsfDh5Q7S1BB8UHiB0Ni3okKn8lEEbeDx1k4k2OjT2jWuzr';
  }
}