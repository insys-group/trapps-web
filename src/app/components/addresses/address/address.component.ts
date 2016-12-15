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
  private _address: Address;
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

  ngOnInit(): void {
    console.log(`Enter: AddressComponent.ngOnInit()`);
    let id = 0;
        this.route.params.subscribe(params => {
        id = +params['id'];
       if (id > 0 && (params[this.constantService.ADDRESS_RES])) {
         console.log(`Parameter Id is ${id}`);
          this.load(id);
        } else {
          this._address = Address.getInstance();
        };
      })
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