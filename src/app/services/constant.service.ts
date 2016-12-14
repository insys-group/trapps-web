import {Injectable} from '@angular/core';

@Injectable()
export class ConstantService {

API_ENDPOINT :string;
ADDRESS_RES: string;
BUSINESS_RES: string;

constructor() {
    console.log('Instantiating service  ConstantService ****************** ' + Date.now());
    this.API_ENDPOINT = 'http://localhost:8081/api/v1/';
    this.ADDRESS_RES = 'addresses'
    this.BUSINESS_RES = 'businesses'
  }
}