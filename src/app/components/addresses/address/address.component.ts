import { Component, Input, OnInit } from '@angular/core';
import { Address } from '../../../models/address.model';
import { AddressService } from '../../../services/address.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from '../../../services/notification.service';

import 'rxjs/add/operator/take';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})

export class AddressComponent implements OnInit {  
  private _addressId = 0 ;
  @Input() 
  set addressId(addressId: number) {
    console.log(`Enter: AddressComponent.@Input ${addressId}`);
    this._addressId = addressId;
  }

  address: Address = new Address();
  isShowSave = true;
  isShowClose = true;
  isShowDelete = true;

  constructor(
    private addressService: AddressService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location, 
    private notificationService: NotificationService
  ) { }


  ngOnInit(): void {
    console.log(`Enter: AddressComponent.ngOnInit()`);
    let id = 0;
     if (this._addressId){
        console.log(`AddressComponent.ngOnInit() this.addressId = ${this._addressId}`);
        id = this._addressId;
        this.isShowClose = false;
        this.isShowDelete = false;
      } else {
        this.route.params.subscribe(params => {
        id = +params['id'];
        console.log(`Parameter Id is ${id} , ${this._addressId}`);
      })
    }
   
   if (id > 0) {
      this.load(id);
   } else {
      this.init();
   };
  }

  private init(): void {
      this.address.id=0;
      this.address.address1='';
      this.address.address2='';
      this.address.city='';
      this.address.state='';
      this.address.zipCode='';
  }

  public load(id: number): void {
    if (id) {
     this.addressService.getAddress(id)
      .subscribe(
        address => {this.address = address;},
        error => this.handleError
      );
    }
  }

  save(): void {
    console.log('Enter: AddressComponent.save()' + this.address.id);
    if(this.address.id===0) {
      this.addressService.create(this.address).subscribe(address => this.address=address, this.handleError);
    } else {
      this.addressService.update(this.address).subscribe(address => this.address=address, this.handleError);
    }
    //this.router.navigate(['/addresses']);
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