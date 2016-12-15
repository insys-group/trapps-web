import { Component, OnInit } from '@angular/core';
import { Business , BusinessType } from '../../../models/business.model';
import { BusinessService } from '../../../services/business.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/take';
import { AddressComponent } from '../../addresses/address/address.component';
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
  address: boolean;
  id: number;
  businessType: string;

  @ViewChild(AddressComponent)
  private addressComponent: AddressComponent;

  constructor(
    private businessService: BusinessService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private notificationService: NotificationService
  ) { }

private findInArray(arr: Array<{rel : string; href: string}>, name: string): string {
    let result = arr.filter(item => item.rel === name)[0];
    return result.href;
  }

  ngAfterViewInit() {
    console.log(`Enter: BusinessComponent.ngAfterViewInit() this.addressComponent= ${this.addressComponent} `);
     if (this.id > 0) {
        this.businessService.getOne(this.id)
          .subscribe(
            business => {
              this.business = business; 
              console.log(`Enter: Check Business Link this.business.links = ${JSON.stringify(this.business.links)}` );
              this.init();
            if (this.business.links){       
               let link = this.findInArray(this.business.links,'addresses');
               this.addressComponent.loadByUrl(link).subscribe(
                      address => {
                        this.addressComponent.address = address.content[0];
                        console.log(`Enter: BusinessComponent.ngAfterViewInit() address= ${JSON.stringify(this.addressComponent.address)} `);
                      },
                      error => {this.handleError}
                  )
              }
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
    console.log(`Enter: BusinessComponent.ngAfterViewInit() this.business.address= ${this.business.address} `);
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
    if(this.business.entityType==='Insys' || this.business.entityType==='Client') {
      this.businessTypes = ['Insys', 'Client'];
      this.businesses = ['INSYS Group'];
    } else {
      this.businessTypes = [this.business.entityType];
    }
    this.address = true;
  }

  save(): void {
    console.log('Enter: BusinessComponent.save()' + this.business.id);
    if(this.business.id===0) {
      this.businessService.createNew(this.business).subscribe(business => this.business=business, this.handleError);
    } else {
      this.businessService.update(this.business).subscribe(business => this.business=business, this.handleError);
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
