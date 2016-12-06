import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { PersonComponent } from './components/persons/person/person.component';
import { PersonListComponent } from './components/persons/person-list/person-list.component';
import { AppRoutingModule } from './app-routing.module';
import { BusinessListComponent } from './components/businesses/business-list/business-list.component';
import { BusinessComponent } from './components/businesses/business/business.component';

import { PersonService, InMemoryPersonService } from './services/person.service';
import { BusinessService, InMemoryBusinessService } from './services/business.service';
import { AddressComponent } from './components/addresses/address/address.component';
import { AddressListComponent } from './components/addresses/address-list/address-list.component';
import { RoleComponent } from './components/roles/role/role.component';
import { RoleListComponent } from './components/roles/role-list/role-list.component';

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
    RoleListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
 //   InMemoryWebApiModule.forRoot(InMemoryPersonService),
    InMemoryWebApiModule.forRoot(InMemoryBusinessService),
    AppRoutingModule
  ],
  providers: [PersonService,BusinessService],

  bootstrap: [AppComponent]
})
export class AppModule { }
