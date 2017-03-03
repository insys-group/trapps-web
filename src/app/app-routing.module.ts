import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from "./components/home/home.component";
import { PersonComponent } from './components/persons/person/person.component';
import { PersonListComponent } from './components/persons/person-list/person-list.component';
import { BusinessComponent } from './components/businesses/business/business.component';
import { BusinessListComponent } from './components/businesses/business-list/business-list.component';
import { RoleListComponent } from './components/roles/role-list/role-list.component';
import { AddressComponent } from './components/addresses/address/address.component';
import { AddressListComponent } from './components/addresses/address-list/address-list.component';
import { InterviewComponent } from './components/interviews/interview/interview.component';
import { InterviewListComponent } from './components/interviews/interview-list/interview-list.component';
import { TrainingComponent } from './components/trainings/training/training.component';
import { TrainingListComponent } from './components/trainings/training-list/training-list.component';
import {InterviewTemplateListComponent} from "./components/interviews/interview-template-list/interview-template-list.component";
import {InterviewTemplateComponent} from "./components/interviews/interview-template/interview-template.component";
import {OpportunityListComponent} from "./components/opportunities/opportunity-list/opportunity-list.component";
import {OpportunityComponent} from "./components/opportunities/opportunity/opportunity.component";

const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home'},
    { path: 'home', component: HomeComponent},
    { path: 'persons', component: PersonListComponent},
    { path: 'persons/:id', component: PersonComponent},
    { path: 'businesses', component: BusinessListComponent},
    { path: 'businesses/:id', component: BusinessComponent},
    { path: 'roles', component: RoleListComponent},
    { path: 'addresses', component: AddressListComponent},
    { path: 'addresses/:id', component: AddressComponent},
    { path: 'interviews', component: InterviewListComponent},
    { path: 'interviews/:id', component: InterviewComponent},
    { path: 'interview-templates', component: InterviewTemplateListComponent},
    { path: 'interview-templates/:id', component: InterviewTemplateComponent},
    { path: 'trainings', component: TrainingListComponent},
    { path: 'trainings/:id', component: TrainingComponent},
    { path: 'opportunities', component: OpportunityListComponent},
    { path: 'opportunities/:id', component: OpportunityComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
