import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {XHRBackend, RequestOptions, HttpModule, Http} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ResourceModule} from 'ng2-resource-rest';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';

import {PersonComponent} from './components/persons/person/person.component';
import {PersonListComponent} from './components/persons/person-list/person-list.component';
import {AppRoutingModule} from './app-routing.module';
import {BusinessListComponent} from './components/businesses/business-list/business-list.component';
import {BusinessComponent} from './components/businesses/business/business.component';

import {ConstantService} from './services/constant.service';
import {BusinessService} from './services/business.service';
import {NotificationService} from './services/notification.service';
import {PersonService} from './services/person.service';
import {RestService} from './services/rest.service';

import {AuthService} from './services/auth.service';
import {TrainingService} from './services/training.service';

import {AddressComponent} from './components/addresses/address/address.component';
import {AddressListComponent} from './components/addresses/address-list/address-list.component';
import {AddressListInnerComponent} from './components/addresses/address-list-inner/address-list-inner.component';
import {RoleComponent} from './components/roles/role/role.component';
import {RoleListComponent} from './components/roles/role-list/role-list.component';
import {InterviewComponent} from './components/interviews/interview/interview.component';

import {FilterPersonTypePipe} from './pipes/filter-person-type.pipe';
import {FilterBusinessTypePipe} from './pipes/filter-business-type.pipe';

import {NotificationDialogComponent} from './components/dialogs/notification-dialog/notification-dialog.component';
import {PersonSkillsComponent} from './components/persons/person-skills/person-skills.component';
import {PersonDocumentsComponent} from './components/persons/person-documents/person-documents.component';
import {StorageSizeFormatterPipe} from './pipes/storage-size-formatter.pipe';
import {ErrorDialogComponent} from './components/dialogs/error-dialog/error-dialog.component';
import {LoginComponent} from './components/login/login.component';

import {InterviewListComponent} from './components/interviews/interview-list/interview-list.component';
import {InterviewService} from './services/interview.service';
import {RoleService} from './services/role.service';
import {TrainingListComponent} from './components/trainings/training-list/training-list.component';
import {TrainingComponent} from './components/trainings/training/training.component';
import {PersonTrainingsComponent} from './components/persons/person-trainings/person-trainings.component';

import {InterviewTemplateListComponent} from "./components/interviews/interview-template-list/interview-template-list.component";
import {InterviewTemplateComponent} from "./components/interviews/interview-template/interview-template.component";
import {OpportunityComponent} from "./components/opportunities/opportunity/opportunity.component";
import {OpportunityListComponent} from "./components/opportunities/opportunity-list/opportunity-list.component";
import {OpportunityService} from "./services/opportunity.service";

import {LoginGuard} from './guards/login.guard';
import {LocalStorageService} from "./services/local.storage.service";
import {UserListComponent} from './components/users/user-list/user-list.component';
import {UserComponent} from './components/users/user/user.component';
import {UserService} from "./services/user.service";
import {LoadingService} from "./services/loading.service";
import {AlertService} from "./services/alert.service";

import {SimpleNotificationsModule} from 'angular2-notifications';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PersonComponent,
    PersonListComponent,
    BusinessComponent,
    BusinessListComponent,
    AddressComponent,
    AddressListComponent,
    AddressListInnerComponent,
    RoleComponent,
    RoleListComponent,
    PersonSkillsComponent,
    InterviewComponent,
    FilterPersonTypePipe,
    NotificationDialogComponent,
    PersonDocumentsComponent,
    FilterBusinessTypePipe,
    StorageSizeFormatterPipe,
    ErrorDialogComponent,
    LoginComponent,
    HomeComponent,
    ErrorDialogComponent,
    InterviewListComponent,
    TrainingListComponent,
    TrainingComponent,
    RoleListComponent,
    PersonTrainingsComponent,
    InterviewTemplateListComponent,
    InterviewTemplateComponent,
    OpportunityComponent,
    OpportunityListComponent,
    UserListComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    //InMemoryWebApiModule.forRoot(TrappsInMemoryDbService),
    ResourceModule.forRoot(),
    AppRoutingModule,
    SimpleNotificationsModule.forRoot()
  ],
  //AddressService
  providers: [
    AuthService,
    LoginGuard,
    ConstantService,
    PersonService,
    RestService,
    BusinessService,
    InterviewService,
    NotificationService,
    RoleService,
    TrainingService,
    OpportunityService,
    LocalStorageService,
    UserService,
    LoadingService,
    AlertService
  ],
  entryComponents: [NotificationDialogComponent, ErrorDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
