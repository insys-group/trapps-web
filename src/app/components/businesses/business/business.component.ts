import { Component, OnInit } from '@angular/core';
import { Business , BusinessType } from '../../../models/business.model';
import { BusinessService } from '../../../services/business.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { AddressListInnerComponent } from '../../addresses/address-list-inner/address-list-inner.component';
import { AfterViewInit, ViewChildren, ViewChild, ContentChildren, ContentChild } from '@angular/core';
import { NotificationService } from '../../../services/notification.service'

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})

export class BusinessComponent implements OnInit, AfterViewInit {
  business: Business = new Business();
  businessType: string;
  businessTypes: string[] = [BusinessType.ALL, BusinessType.CLIENT, BusinessType.PLABS,
  BusinessType.PIVOTAL, BusinessType.VENDOR, BusinessType.INSYS];
  businesses: string[] = ['Comcast', 'Aptium', 'Pivotal', 'INSYS Group'];
  id: number;
  @ViewChild(AddressListInnerComponent)
  private addressComponent: AddressListInnerComponent;

  constructor(
    private businessService: BusinessService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private notificationService: NotificationService
  ) { }

  ngAfterViewInit() {
    console.log(`Enter: BusinessComponent.ngAfterViewInit() this.addressComponent= ${this.addressComponent} `);
     if (this.id > 0) {
        this.businessService.getOne(this.id)
          .subscribe(
            business => {
              this.business = business; 
              this.addressComponent.addresses = this.business.addresses;
            },
            error => this.handleError
          );
      } else {
        if(this.businessType != ' ') {
          this.business.businessType=this.businessType;
            console.log(`Enter: Check Business Type not empty = ${this.business.businessType}` );
        } else {
          this.business.businessType='Vendor';
             console.log(`Enter: Check Business Type empty = ${this.business.businessType}` );
        }
        this.init();
      }
    console.log(`Exit: BusinessComponent.ngAfterViewInit() this.business.address= ${this.business.addresses} `);
  }

ngOnInit(): void {
    console.log(`Entering: BusinessComponent.ngOnInit()`);
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.businessType=params['businessType'];
      console.log(`Parameter Id is ${this.id}`);
    });
  }


  private init(): void {

    if(this.business.businessType==='Insys' || this.business.businessType==='Client') {
      this.businessTypes = ['Insys', 'Client'];
      this.businesses = ['INSYS Group'];
    } else {
      this.businessTypes = [this.business.businessType];
    }
    //this.address = true;
  }
    
 /* save(): void {
       this.business.addresses = [this.addressComponent.address];
            if(this.business.id) {
               this.businessService.update(this.business).subscribe(business => this.handleSuccess(business)
              , error => {console.log(`Error: BusinessComponent person.update() `); this.handleError}
              );
            } else {
              this.businessService.createNew(this.business).subscribe(business => this.handleSuccess(business)
              , error => {console.log(`Error:  BusinessComponent person.save() `); this.handleError}
              );
            }
        error => {console.log(`Error:  BusinessComponent address.save() `); this.handleError} 

   if(this.business.entityType==='Insys' || this.business.entityType==='Client') {
      this.businessTypes = ['Insys', 'Client'];
      this.businesses = ['INSYS Group'];
    } else {
      this.businessTypes = [this.business.entityType];
    }
  }  */

  save(): void {
    console.log('Enter: BusinessComponent.save()' + this.business.id);
    this.business.addresses = this.addressComponent.addresses;
    if(this.business.id) {
      console.log(`update = ${JSON.stringify(this.business)} `);
      this.businessService.updateSubRes(this.business).subscribe(business => {this.business=business;  this.notificationService.info('Business Data saved successfully');}, this.handleError);
    } else {
      console.log(`new = ${JSON.stringify(this.business)} `);
      this.businessService.createNew(this.business).subscribe(business => {this.business=business;  this.notificationService.info('Business Data saved successfully');}, this.handleError);
    }
  }

  delete(): void {
    console.log('Enter: BusinessComponent.delete()');
    this.businessService.delete(this.business.id).subscribe(() => this.router.navigate(['/businesses']), this.handleError);
  }

  cancel(): void {
    this.location.back();
  }

   private handleError(error: any): void {
    console.error('An error occurred', error);
    this.notificationService.error('An Error occured ' + error);
  }

  private handleSuccess(business: Business): void {
    this.business=business;
    this.notificationService.info('Business Data saved successfully');
  }
}
