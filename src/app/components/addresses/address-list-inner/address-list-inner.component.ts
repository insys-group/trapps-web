import { Component, Input, OnInit } from '@angular/core';
import { Address } from '../../../models/address.model';

@Component({
  selector: 'app-address-list-inner',
  templateUrl: './address-list-inner.component.html',
  styleUrls: ['./address-list-inner.component.css']
})

export class AddressListInnerComponent implements OnInit {
  private _addresses = new Array<Address>();
  private _states = ["NY", "NC", "PA"];

  set addresses(addresses: Address[]) {
    console.log(`Enter: AddressComponent.set ${addresses}`);
    this._addresses = addresses;
  }
  
  get addresses(): Address[] {
    return this._addresses;
  }

  constructor( ) 
  {
    console.log('AddressListComponent constructor');
  }

  ngOnInit() {
    console.log('ngOnInit() = ' + this.addresses);
  }

  add() {
    this._addresses = [Address.getInstance()].concat(this._addresses);
  }

  delete(i: number) {
    this._addresses.splice(i, 1);
  }

  reset() {
    this._addresses = new Array<Address>();
  }

}