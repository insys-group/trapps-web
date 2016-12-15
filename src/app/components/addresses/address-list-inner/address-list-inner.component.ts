import { Component, Input, OnInit } from '@angular/core';
import { AddressService } from '../../../services/address.service';
import { Address } from '../../../models/address.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IResource } from '../../../resources/crud.resource';
import { Http, Headers, Response } from '@angular/http';
import { Injector } from '@angular/core';
import {ConstantService} from  '../../../services/constant.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-address-list-inner',
  templateUrl: './address-list-inner.component.html',
  styleUrls: ['./address-list-inner.component.css']
})

export class AddressListInnerComponent implements OnInit {
  
  closeResult: string;
  errorMessage: string;
 private _addresses: Address[];

  set address(addresses: Address[]) {
    console.log(`Enter: AddressComponent.set ${_addresses}`);
    this._addresses = addresses;
  }
  get addresses(): Address[] {
    return this._addresses;
  }

  constructor(
    private addressService: AddressService,
    private router: Router, 
    private http: Http,
    private injector: Injector,
    private constantService: ConstantService,
    private notificationService: NotificationService
    ) 
    {
     console.log('AddressListComponent constructor');
     this.addressService = new AddressService(http , injector);
     }

  ngOnInit() {
    console.log('ngOnInit() = ' + this.addresses);
  }

 public loadByUrl(url: string) {
    if (url) {
     let service = new AddressService(this.http, this.injector);
     return service.getByUrl(url);
    } else {
      return null;
    }
  }

   public save() {
    if(this._address.id===null) {
      console.log('Enter: AddressComponent.save()' + this._address.id);
      return this.addressService.createNew(this._address)
    } else {
      console.log('Enter: AddressComponent.update()' + this._address.id);
      return this.addressService.update(this._address)
    }
  }
  add() {
    this.router.navigate(['/addresses', 0]);
  }

  delete() {
    this.router.navigate(['/addresses', 0]);
  }

}