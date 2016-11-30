import { Component, OnInit } from '@angular/core';
import { Business, BusinessType } from  '../model/business.models';
@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
 testVar: string = 'This is Test';
  business: Business = {
      id: 0,
      businessId: 0,
      name: 'Insys',
      description: 'Luxoft Business',
      addresses:"",
      businessType: BusinessType.CLIENT
  };

  constructor() { 
  }

  ngOnInit() {
    
  }

}
