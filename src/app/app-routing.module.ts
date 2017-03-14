import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./components/home/home.component";
import { PersonComponent } from './components/persons/person/person.component';
import { PersonListComponent } from './components/persons/person-list/person-list.component';
import { BusinessComponent } from './components/businesses/business/business.component';
import { BusinessListComponent } from './components/businesses/business-list/business-list.component';
import { RoleListComponent } from './components/roles/role-list/role-list.component';
import { AddressComponent } from './components/addresses/address/address.component';
import { LoginComponent } from './components/login/login.component';
import { AddressListComponent } from './components/addresses/address-list/address-list.component';
import { LoginGuard } from './guards/login.guard';
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
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent, canActivate: [LoginGuard]},
    { path: 'persons', component: PersonListComponent, canActivate: [LoginGuard]},
    { path: 'persons/:id', component: PersonComponent, canActivate: [LoginGuard]},
    { path: 'businesses', component: BusinessListComponent, canActivate: [LoginGuard]},
    { path: 'businesses/:id', component: BusinessComponent, canActivate: [LoginGuard]},
    { path: 'roles', component: RoleListComponent, canActivate: [LoginGuard]},
    { path: 'addresses', component: AddressListComponent, canActivate: [LoginGuard]},
    { path: 'addresses/:id', component: AddressComponent, canActivate: [LoginGuard]},
    { path: 'interviews', component: InterviewListComponent, canActivate: [LoginGuard]},
    { path: 'interviews/:id', component: InterviewComponent, canActivate: [LoginGuard]},
    { path: 'interview-templates', component: InterviewTemplateListComponent, canActivate: [LoginGuard]},
    { path: 'interview-templates/:id', component: InterviewTemplateComponent, canActivate: [LoginGuard]},
    { path: 'trainings', component: TrainingListComponent, canActivate: [LoginGuard]},
    { path: 'trainings/:id', component: TrainingComponent, canActivate: [LoginGuard]},
    { path: 'opportunities', component: OpportunityListComponent, canActivate: [LoginGuard]},
    { path: 'opportunities/:id', component: OpportunityComponent, canActivate: [LoginGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
