import { Component, OnInit } from '@angular/core';
import {BusinessService} from "../../../services/business.service";
import {Router, ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../../services/notification.service";
import {PersonService} from "../../../services/person.service";
import {OpportunityService} from "../../../services/opportunity.service";
import {Opportunity} from "../../../models/opportunity/opportunity.model";
import {Business} from "../../../models/business.model";
import {Person} from "../../../models/person.model";
import {OpportunityStep} from "../../../models/opportunity/opportunity.step.model";
import {Engagement} from "../../../models/opportunity/engagement.model";

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.css']
})
export class OpportunityComponent implements OnInit {

  opportunityId: number;
  opportunity: Opportunity = new Opportunity();
  businesses: Business[];
  person: Person;
  business: Business;
  newStep: OpportunityStep = new OpportunityStep();
  newEngagement: Engagement = new Engagement();

  constructor(private opportunityService: OpportunityService, private businessService: BusinessService, 
              private router: Router, private route: ActivatedRoute, private notificationService: NotificationService, 
              private personService: PersonService) {
    this.route.params.subscribe(params => {
      this.opportunityId = +params['id'];
    });
  }

  ngOnInit(): void {
    this.getPerson();
    this.getBusinesses();
    this.getOpportunity();
  }

  /* todo: remove when user connected available*/
  getPerson(){
    this.personService.getPerson(11)
      .subscribe(
        person => {
          this.person = person;
        },
        error => this.notificationService.notifyError(error)
      );
  }
  /*remove when user connected available*/

  save(): void {
    this.opportunityService.saveOpportunity(this.opportunity)
      .subscribe(
        opportunity => {
          this.router.navigate(['/opportunities', opportunity.id]);
          this.opportunityId = + opportunity.id;
          this.getOpportunity();
        },
        error => this.notificationService.notifyError(error)
      )
  }

  getOpportunity() {
    if(this.opportunityId){
      this.opportunityService.getOpportunity(this.opportunityId)
        .subscribe(
          opportunity => {

            this.opportunity = opportunity;
            this.autopopulateBusiness();

          },
          error => this.notificationService.notifyError(error)
        );
    }
  }

  getBusinesses() {
    this.businessService.getBusinesses()
      .subscribe(
        businesses => {
          this.businesses = businesses;
          this.autopopulateBusiness();
        },
        error => this.notificationService.notifyError(error)
      )
  }

  autopopulateBusiness() {
    if(this.businesses && this.opportunity.business){
      this.businesses.forEach(business => {
          if(business.id === this.opportunity.business.id){
            this.opportunity.business = business;
          }
        }
      )
    }
  }

  addStep() {
    this.opportunity.opportunitySteps.push(this.newStep);
    this.save();
    this.newStep = new OpportunityStep();
  }

  removeStep(index : number) {
    this.opportunity.opportunitySteps.splice(index, 1);
    this.save();
  }

  addEngagement() {
    this.opportunity.engagements.push(this.newEngagement);
    this.save();
    this.newEngagement = new Engagement();
  }

  removeEngagement(index : number) {
    this.opportunity.engagements.splice(index, 1);
    this.save();
  }


}
