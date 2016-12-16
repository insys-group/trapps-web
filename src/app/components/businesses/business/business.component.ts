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

export class BusinessComponent implements OnInit {
  business: Business = new Business();
  businessTypes: string[] = [BusinessType.ALL, BusinessType.CLIENT, BusinessType.PLABS,
    BusinessType.PIVOTAL, BusinessType.VENDOR, BusinessType.INSYS];
  businesses: string[] = ['Comcast', 'Aptium', 'Pivotal', 'INSYS Group'];
  id: number;
  businessType: string;

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
        if(this.business.entityType!='') {
          this.business.entityType=this.business.entityType;
        } else {
          this.business.entityType='Vendor';
        }
        this.init();
      }
  }

  ngOnInit(): void {
    console.log(`Enter: BusinessComponent.ngOnInit()`);
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.businessType=params['businessType'];
      console.log(`Parameter Id is ${this.id}`);
    });
  }

  private init(): void {
   /* if(this.business.entityType==='Insys' || this.business.entityType==='Client') {
      this.businessTypes = ['Insys', 'Client'];
      this.businesses = ['INSYS Group'];
    } else {
      this.businessTypes = [this.business.entityType];
    }*/
  }

  save(): void {
    console.log('Enter: BusinessComponent.save()' + this.business.id);
    this.business.addresses = this.addressComponent.addresses;
    if(this.business.id===0) {
      this.businessService.createNew(this.business).subscribe(business => this.business=business, this.handleError);
    } else {
      console.log(`update = ${JSON.stringify(this.business)} `);
      this.businessService.update(this.business).subscribe(business => this.business=business, this.handleError);
    }
    this.notificationService.info('Business Data saved successfully');
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
