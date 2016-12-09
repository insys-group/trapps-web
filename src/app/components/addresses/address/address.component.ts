import { Component, OnInit } from '@angular/core';
import { Address } from '../../../models/address.model';
import { AddressService } from '../../../services/address.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { AddressRes } from '../../../resources/address.resource';

import 'rxjs/add/operator/take';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})

export class AddressComponent implements OnInit {
  address: Address = new Address();

  constructor(
    private addressService: AddressRes,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    console.log(`Enter: AddressComponent.ngOnInit()`);
    let id = 0;
    this.route.params.subscribe(params => {
      id = +params['id'];
      console.log(`Parameter Id is ${id}`);
      if (id > 0) {
        this.addressService.get({id})
        .$observable
          .subscribe(
            address => {this.address = address;},
            error => this.handleError
          );
      } else {
        this.init();
      }
    });
    console.log('Addresses : ' + JSON.stringify(this.address, null, 4));
  }

  private init(): void {
      this.address.id=null;
      this.address.address1='';
      this.address.address2='';
      this.address.city='';
      this.address.state='';
      this.address.zipCode='';
  }

  save(): void {
    if(this.address.id===null) {
      console.log('Enter: AddressComponent.save()' + this.address.id);
      this.addressService.save(this.address).$observable.subscribe(address => this.address=address);
    } else {
      console.log('Enter: AddressComponent.update()' + this.address.id);
      this.addressService.update(this.address).$observable.subscribe(address => this.address=address, this.handleError);
    }
    //this.router.navigate(['/addresses']);
  }

  delete(): void {
    console.log('Enter: AddressComponent.delete()');
    this.addressService.remove({ id: this.address.id }).$observable.subscribe(() => this.router.navigate(['/addresses']), this.handleError);
  }

  cancel(): void {
    this.location.back();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}