import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonComponent } from './components/persons/person/person.component';
import { PersonListComponent } from './components/persons/person-list/person-list.component';
import { BusinessComponent } from './components/businesses/business/business.component';
import { BusinessListComponent } from './components/businesses/business-list/business-list.component';
import { RoleComponent } from './components/roles/role/role.component';
import { RoleListComponent } from './components/roles/role-list/role-list.component';
import { AddressComponent } from './components/addresses/address/address.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AddressListComponent } from './components/addresses/address-list/address-list.component';
import { LoginGuard } from './guards/login.guard';

const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'home', component: HomeComponent, canActivate: [LoginGuard] },
    { path: 'login', component: LoginComponent},
    { path: 'persons', component: PersonListComponent, canActivate: [LoginGuard] },
    { path: 'persons/:id', component: PersonComponent, canActivate: [LoginGuard] },
    { path: 'businesses', component: BusinessListComponent, canActivate: [LoginGuard] },
    { path: 'businesses/:id', component: BusinessComponent, canActivate: [LoginGuard] },
    { path: 'roles', component: RoleListComponent, canActivate: [LoginGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}

