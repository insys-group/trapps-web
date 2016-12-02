import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../../services/address.service';
import { Address } from '../../../models/address.model';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {
 errorMessage: string;
  address: Address[];

  constructor(private addressService: AddressService) { }

  getAddresses() {
    this.addressService.getAddresses()
    .subscribe(
      address => this.address = address,
      error => this.errorMessage = error
    );
  }
  ngOnInit() {
    this.getAddresses();
  }
}
