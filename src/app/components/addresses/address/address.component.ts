import { Component, Input, OnInit } from '@angular/core';
import { Address } from '../../../models/address.model';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})

export class AddressComponent implements OnInit {
  private _address: Address;
  @Input()
  set address(address: Address) {
    console.log(`Enter: AddressComponent.set ${address}`);
    this._address = address;
  }
  get address(): Address {
    return this._address;
  }

   constructor(  ) { }

  ngOnInit(): void {
    console.log(`Enter: AddressComponent.ngOnInit()`);
  }

}