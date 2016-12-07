import { Component, OnInit } from '@angular/core';
import { Address } from '../../../models/address.model';
import { AddressService } from '../../../services/address.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/take';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})

export class AddressComponent implements OnInit {
  address: Address = new Address();

  constructor(
    private addressService: AddressService,
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
        this.addressService.getAddress(id)
          .subscribe(
            address => {this.address = address;},
            error => this.handleError
          );
      } else {
        this.address.id=0;
        this.init();
      }
    });
  }

  private init(): void {
      this.address.address_1='';
      this.address.address_2='';
      this.address.city='';
      this.address.state='';
      this.address.zip_code='';
  }

  save(): void {
    console.log('Enter: AddressComponent.save()' + this.address.id);
    if(this.address.id===0) {
      this.addressService.create(this.address).subscribe(address => this.address=address, this.handleError);
    } else {
      this.addressService.update(this.address).subscribe(address => this.address=address, this.handleError);
    }
    this.router.navigate(['/addresses']);
  }

  delete(): void {
    console.log('Enter: AddressComponent.delete()');
    this.addressService.delete(this.address.id).subscribe(() => this.router.navigate(['/addresses']), this.handleError);
  }

  cancel(): void {
    this.location.back();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}