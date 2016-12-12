import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../../services/address.service';
import { Address } from '../../../models/address.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IResource } from '../../../resources/crud.resource';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})

export class AddressListComponent implements OnInit {
  closeResult: string;

  errorMessage: string;
  addresses: IResource[];

  constructor(private router: Router, private addressService: AddressService) {
     console.log('AddressListComponent constructor');
  }

  ngOnInit() {
    console.log('Enter: AddressListComponent.ngOnInit()');
    this.addressService.getAll()
      .subscribe(data => {
        this.addresses = data.content;
      });
    console.log('out 1 ' + this.addresses);
  }

  onSelect(address: Address) {
    this.router.navigate(['/addresses', address.id]);
  }

  create() {
    this.router.navigate(['/addresses', 0]);
  }

    createNewAddress() {
    console.log('will call new component');
  }
}