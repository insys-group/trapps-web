import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../../services/address.service';
import { Address } from '../../../models/address.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})

export class AddressListComponent implements OnInit {
 errorMessage: string;
  addresses: Address[];

  constructor(private addressService: AddressService) { }

  getAddresses() {
    this.addressService.getAddresses()
    .subscribe(
      addresses => this.addresses = addresses,
      error => this.errorMessage = error
    );
  }

  ngOnInit() {
    this.getAddresses();
  }

    createNewAddress() {
      console.log('will call new component');
    }
}
