import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../../services/address.service';
import { AddressRes } from '../../../resources/address.resource';
//import { NewAddressRes } from '../../../resources/addressCrud.resource';
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

  constructor(private router: Router, private addressService: AddressRes) {
     console.log('AddressListComponent constructor');
  }

  ngOnInit() {
    console.log('Enter: AddressListComponent.ngOnInit()');
    let ret = this.addressService.query()
    .$observable
      .subscribe(data => {
        //console.log('Addresses : ' + JSON.stringify(data, null, 4));
        this.addresses = data.content;
      });
    //console.log('out ' + JSON.stringify(ret.content, null, 4) );
    //this.addresses = ret.content;
   //this.addressService.getAddresses().subscribe(addresses => {this.addresses=addresses;});
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
