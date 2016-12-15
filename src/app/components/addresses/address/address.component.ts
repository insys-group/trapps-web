import { Component, Input, OnInit } from '@angular/core';
import { Address } from '../../../models/address.model';
import { AddressService } from '../../../services/address.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from '../../../services/notification.service';
import {ConstantService} from  '../../../services/constant.service';
import { Http} from '@angular/http';
import { Injector } from '@angular/core';
import {CRUDResource} from '../../../resources/crud.resource';

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

  private _address: Address = new Address();

  set address(address: Address) {
    console.log(`Enter: AddressComponent.set ${address}`);
    this._address = address;
  }
  get address(): Address {
    return this._address;
  }

  isShowSave = false;
  isShowClose = false;
  isShowDelete = false;

   constructor(
    private addressService: AddressService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location, 
    private notificationService: NotificationService,
    private constantService: ConstantService,
    private http: Http,
    private injector: Injector
  ) { }

  private setBaseUrl(){
    this.addressService.setUrl(this.constantService.API_ENDPOINT + this.constantService.ADDRESS_RES);
  }

  ngOnInit(): void {
    console.log(`Enter: AddressComponent.ngOnInit()`);
    this.setBaseUrl;
    let id = 0;
     if (this._addressId){
        console.log(`AddressComponent.ngOnInit() this._addressId = ${this._addressId}`);
        id = this._addressId;
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

  public load(id: number): void {
    if (id) {
     this.addressService.getOne(id)
      .subscribe(
        address => {this._address = address},
        error => this.handleError
      );
    }
  }

 public loadByUrl(url: string) {
    if (url) {
     let service = new AddressService(this.http, this.injector);
     return service.getByUrl(url);
    } else {
      return null;
    }
  }

 public enableEdit(): void {
      this.isShowSave = false;
      this.isShowDelete = false;
      this.isShowClose = false;
  }

  private init(): void {
      this._address.id=null;
      this._address.address1='';
      this._address.address2='';
      this._address.city='';
      this._address.state='';
      this._address.zipCode='';
  }

   public saveSynh() {
    if(this._address.id===null) {
      console.log('Enter: AddressComponent.save()' + this._address.id);
      return this.addressService.createNew(this._address)
    } else {
      console.log('Enter: AddressComponent.update()' + this._address.id);
      return this.addressService.update(this._address)
    }
  }

  public save(): void {
     this.saveSynh().subscribe(
        address => {
          this._address = address;
          console.log(`Enter:  AddressComponent.save() ok address = ${JSON.stringify(address)}`);
          },
        error => {this.handleError}
      );
    console.log(`Enter:  AddressComponent.save() ok = ${JSON.stringify(this._address)}`);
  }

  delete(): void {
    console.log('Enter: AddressComponent.delete()');
    this.addressService.delete(this._address.id).subscribe(() => this.router.navigate(['/addresses']), this.handleError);
  }

  cancel(): void {
    this.location.back();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}