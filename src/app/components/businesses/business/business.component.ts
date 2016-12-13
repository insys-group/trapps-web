import { Component, OnInit } from '@angular/core';
import { Business , BusinessType } from '../../../models/business.model';
import { BusinessService } from '../../../services/business.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/take';

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

  constructor(
    private businessService: BusinessService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() : void {
    console.log(`Enter: BusinessComponent.ngOnInit()`);
    let id = 0;
    let businessType = '';
    this.route.params.subscribe(params => {
      id = +params['id'];
      businessType=params['businessType'];
      console.log(`Parameter Id is ${id}`);
      if (id > 0) {
        this.businessService.getOne(id)
          .subscribe(
            business => {this.business = business; this.init();},
            error => this.handleError
          );
      } else {
        this.business.id=0;
        if(businessType!='') {
          this.business.entityType=businessType;
        } else {
          this.business.entityType='Insys';
        }
        this.init();
      }
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
      this.businessService.create(this.business).subscribe(business => this.business=business, this.handleError);
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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
