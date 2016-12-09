import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ResourceModule } from 'ng2-resource-rest';

import { AppComponent } from './app.component';
import { PersonComponent } from './components/persons/person/person.component';
import { PersonListComponent } from './components/persons/person-list/person-list.component';
import { AppRoutingModule } from './app-routing.module';
import { BusinessListComponent } from './components/businesses/business-list/business-list.component';
import { BusinessComponent } from './components/businesses/business/business.component';


import { TrappsInMemoryDbService } from './services/trappsdb.service';
import { BusinessService } from './services/business.service';
import { NotificationService } from './services/notification.service';
import { PersonService } from './services/person.service';
import { AddressService } from './services/address.service';

import { AddressComponent } from './components/addresses/address/address.component';
import { AddressListComponent } from './components/addresses/address-list/address-list.component';
import { RoleComponent } from './components/roles/role/role.component';
import { RoleListComponent } from './components/roles/role-list/role-list.component';

import { FilterPersonTypePipe } from './pipes/filter-person-type.pipe';
import { FilterBusinessTypePipe } from './pipes/filter-business-type.pipe';

import { NotificationDialogComponent } from './components/dialogs/notification-dialog/notification-dialog.component';
import { PersonSkillsComponent } from './components/persons/person-skills/person-skills.component';
import { PersonDocumentsComponent } from './components/persons/person-documents/person-documents.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    PersonListComponent,
    BusinessComponent,
    BusinessListComponent,
    AddressComponent,
    AddressListComponent,
    RoleComponent,
    RoleListComponent,
    PersonSkillsComponent,
    FilterPersonTypePipe,
    NotificationDialogComponent,
    PersonDocumentsComponent,
    FilterBusinessTypePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    InMemoryWebApiModule.forRoot(TrappsInMemoryDbService),
    ResourceModule.forRoot(),
    AppRoutingModule
  ],
  providers: [PersonService, BusinessService, AddressService, NotificationService],
  entryComponents: [NotificationDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
