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

export class BusinessComponent implements OnInit , AfterViewInit{
  business: Business = new Business();
  businessTypes: string[] = [BusinessType.CLIENT, BusinessType.PLABS,
    BusinessType.PIVOTAL, BusinessType.VENDOR, BusinessType.INSYS];
  businesses: string[] = ['Comcast', 'Aptium',  'Pivotal', 'INSYS Group'];
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
        if(this.businessType != ' ') {
          this.business.businessType=this.businessType;
            console.log(`Enter: Check Business Type not empty = ${this.business.businessType}` );
        } else {
          this.business.businessType='Vendor';
             console.log(`Enter: Check Business Type empty = ${this.business.businessType}` );
        }
        this.init();
      }
    console.log(`Exit: BusinessComponent.ngAfterViewInit() this.business.address= ${this.business.address} `);
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
    this.address = true;
  }

  save(): void {
   console.log('Enter: BusinessComponent address.save() ' + this.addressComponent.address.id);
    this.addressComponent.saveSynh().subscribe(
        address => {
          this.addressComponent.address = address;
          this.business.address = address;
           console.log(`Exit:  BusinessComponent address.save() ok address = ${JSON.stringify(address)}`);
           console.log(`Enter:  BusinessComponent business.save()  or update() ${JSON.stringify(this.business)}`);
            if(this.business.id) {
               this.businessService.update(this.business).subscribe(person => this.handleSuccess(person)
              , error => {console.log(`Error:  BusinessComponent business.update() `); this.handleError}
              );
            } else {
              this.businessService.createNew(this.business).subscribe(person => this.handleSuccess(person)
              , error => {console.log(`Error:  BusinessComponent business.save() `); this.handleError}
              );
            }
        },
        error => {console.log(`Error:  PersonComponent address.save() `); this.handleError}
    );
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
