import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../../services/address.service';
import { Address } from '../../../models/address.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})

export class AddressListComponent implements OnInit {
  closeResult: string;

  errorMessage: string;
  addresses: Address[];

  constructor(private router: Router, private AddressService: AddressService) { }

  ngOnInit() {
    console.log('Enter: AddressListComponent.ngOnInit()');
    this.AddressService.getAddresses().subscribe(
      addresses => {this.addresses=addresses;
      });
  }

  onSelect(Address: Address) {
    this.router.navigate(['/address', Address.id]);
  }

  create() {
    this.router.navigate(['/address', 0]);
  }

    createNewAddress() {
    console.log('will call new component');
  }
}
