import { Component, OnInit } from '@angular/core';
import { Address } from '../../../models/address.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  testVar: string = 'This is Test';
  person: Address = {
      id: 0,          
      address_1: '344 Dreess Rd',
      address_2: '',
      city: 'Paramus',
      state: 'NJ',
      zip_code: '345435' 
  };

  constructor() { }

  ngOnInit() {
  }

}
