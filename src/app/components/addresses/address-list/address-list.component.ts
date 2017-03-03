import { Component, Input, OnInit } from '@angular/core';
//import { AddressService } from '../../../services/address.service';
import { Address } from '../../../models/address.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
//import { IResource } from '../../../resources/crud.resource';
import { Http, Headers, Response } from '@angular/http';
import { Injector } from '@angular/core';
import {ConstantService} from  '../../../services/constant.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})

export class AddressListComponent implements OnInit {
  private _addressUrl;
  @Input()
  set addressUrl(url: string) {
    console.log(`Enter: AddressComponent.@Input ${url}`);
    this._addressUrl = url;
  } 
  closeResult: string;

  errorMessage: string;
  //addresses: IResource[];
 // private addressService: AddressService;

  constructor(private router: Router, 
    private http: Http,
    private injector: Injector,
    private constantService: ConstantService,
    private notificationService: NotificationService) 
    {
     console.log('AddressListComponent constructor');
   //  this.addressService = new AddressService(http , injector);
     }

  ngOnInit() {
    console.log('Enter: AddressListComponent.ngOnInit()');
   /* if (this._addressUrl) {
      this.addressService.setUrl(this._addressUrl);
    } else {
    this.addressService.setUrl(this.constantService.API_ENDPOINT + this.constantService.ADDRESS_RES);
   }
    
    this.addressService.getAll()
      .subscribe(
        data => {this.addresses = data.content;},
        error => this.notificationService.error(error.json().error)
      );*/
   // console.log('out 1 ' + this.addresses);
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
