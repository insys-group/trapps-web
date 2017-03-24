import { Component, OnInit } from '@angular/core';
import {OpportunityService} from "../../../services/opportunity.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../../services/notification.service";
import {Opportunity} from "../../../models/opportunity/opportunity.model";

@Component({
  selector: 'app-opportunity-list',
  templateUrl: './opportunity-list.component.html',
  styleUrls: ['./opportunity-list.component.css']
})
export class OpportunityListComponent implements OnInit {

  opportunities;

  constructor(private opportunityService: OpportunityService, private router: Router,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.getOpportunities();
  }

  onSelect(opportunity: Opportunity) {
    this.goDetails(opportunity.id);
  }

  goDetails(id){
    this.router.navigate(['/opportunities', id]);
  }

  getOpportunities() {
    this.opportunityService.getOpportunities()
      .subscribe(
        opportunities => {
          if(opportunities[0] && opportunities[0].id){
            this.opportunities = opportunities;
            console.log(this.opportunities);
          }
        },
        error => this.notificationService.notifyError(error)
      )
  }

  removeOpportunity(opportunity: Opportunity) {
    this.opportunityService.removeOpportunity(opportunity)
      .subscribe(
        opportunities => {
          console.log(opportunities);
        },
        error => this.notificationService.notifyError(error)
      );
    this.getOpportunities();
  }

}
