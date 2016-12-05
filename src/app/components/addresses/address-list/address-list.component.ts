import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../../services/address.service';
//import { Service } from '../../../services/person.service';
import { Address } from '../../../models/address.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})

export class AddressListComponent implements OnInit {
  closeResult: string;

  errorMessage: string;
  addresses: Address[];

  constructor(private router: Router, private addressService: AddressService) { 
     console.log('AddressListComponent constructor');
  }

  ngOnInit() {
    console.log('Enter: AddressListComponent.ngOnInit()');
    this.addressService.getAddresses().subscribe(addresses => {this.addresses=addresses;});
  }

  onSelect(address: Address) {
    this.router.navigate(['/address', address.id]);
  }

  create() {
    this.router.navigate(['/address', 0]);
  }

    createNewAddress() {
    console.log('will call new component');
  }
}
