import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../../services/business.service';
import { Business } from '../../../models/business.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css']
})
export class BusinessListComponent implements OnInit {

//  errorMessage: string;
//  businesses: Business[];
//
//  constructor(private businessService: BusinessService) { }
//
//  getBusinesses() {
//    this.businessService.getBusinesses()
//    .subscribe(
//      businesses => this.businesses = businesses,
//      error => this.errorMessage = error
//    );
//  }
//
//  ngOnInit() {
//    this.getBusinesses();
//  }
  
  constructor() { }

  ngOnInit() {
  }

}
