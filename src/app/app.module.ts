import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResourceModule } from 'ng2-resource-rest';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { PersonComponent } from './components/persons/person/person.component';
import { PersonListComponent } from './components/persons/person-list/person-list.component';
import { AppRoutingModule } from './app-routing.module';
import { BusinessListComponent } from './components/businesses/business-list/business-list.component';
import { BusinessComponent } from './components/businesses/business/business.component';

import { ConstantService } from './services/constant.service';
import { TrappsInMemoryDbService } from './services/trappsdb.service';
import { BusinessService } from './services/business.service';
import { NotificationService } from './services/notification.service';
import { PersonService } from './services/person.service';
import { AddressService } from './services/address.service';
import { RestService } from './services/rest.service';

import { AddressComponent } from './components/addresses/address/address.component';
import { AddressListComponent } from './components/addresses/address-list/address-list.component';
import { AddressListInnerComponent } from './components/addresses/address-list-inner/address-list-inner.component';
import { RoleComponent } from './components/roles/role/role.component';
import { RoleListComponent } from './components/roles/role-list/role-list.component';
import { InterviewComponent } from './components/interviews/interview/interview.component';

import { FilterPersonTypePipe } from './pipes/filter-person-type.pipe';
import { FilterBusinessTypePipe } from './pipes/filter-business-type.pipe';

import { NotificationDialogComponent } from './components/dialogs/notification-dialog/notification-dialog.component';
import { PersonSkillsComponent } from './components/persons/person-skills/person-skills.component';
import { PersonDocumentsComponent } from './components/persons/person-documents/person-documents.component';
import { StorageSizeFormatterPipe } from './pipes/storage-size-formatter.pipe';
import { ErrorDialogComponent } from './components/dialogs/error-dialog/error-dialog.component';
import { InterviewListComponent } from './components/interviews/interview-list/interview-list.component';
import { InterviewService } from './services/interview.service';
import { RoleService } from './services/role.service';

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
    ErrorDialogComponent,
    InterviewListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    //InMemoryWebApiModule.forRoot(TrappsInMemoryDbService),
    ResourceModule.forRoot(),
    AppRoutingModule
  ],
  providers: [ConstantService, PersonService, RestService, BusinessService, AddressService, InterviewService, NotificationService, RoleService],
  entryComponents: [NotificationDialogComponent, ErrorDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
