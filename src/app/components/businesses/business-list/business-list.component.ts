import { Component, OnInit, EventEmitter } from '@angular/core';
import { BusinessService } from '../../../services/business.service';
import { Business, BusinessType } from '../../../models/business.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css']
})

export class BusinessListComponent implements OnInit {
  closeResult: string;
  errorMessage: string;
  businesses: Business[];
  businessTypes: string[] = [ BusinessType.ALL, BusinessType.CLIENT, BusinessType.PLABS,
    BusinessType.PIVOTAL, BusinessType.VENDOR, BusinessType.INSYS]
  businessType: string = BusinessType.PLABS;

  select = new EventEmitter();

  constructor(private router: Router, private businessService: BusinessService) { }

  ngOnInit() {
    console.log('Enter: BusinessListComponent.ngOnInit()');
    this.businessService.getBusinesses().subscribe(
      businesses => { this.businesses=businesses; }
    );

    this.select.emit(this.businessTypes[0]);
  }

  onSelect(business: Business) {
    this.router.navigate(['/businesses', business.id]);
  }

  create() {
    this.router.navigate(['/businesses', 0, {businessType: this.businessType}]);
  }

  createNewBusiness() {
    console.log('will call new component');
  }
}
