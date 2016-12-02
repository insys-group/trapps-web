import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonComponent } from './components/persons/person/person.component';
import { PersonListComponent } from './components/persons/person-list/person-list.component';
import { BusinessComponent } from './components/businesses/business/business.component';
import { BusinessListComponent } from './components/businesses/business-list/business-list.component';
import { RoleComponent } from './components/roles/role/role.component';
import { RoleListComponent } from './components/roles/role-list/role-list.component';

const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'persons'},
    { path: 'persons', component: PersonListComponent},
    { path: 'persons/:id', component: PersonComponent},
    { path: 'businesses', component: BusinessListComponent},
    { path: 'businesses/:id', component: BusinessComponent},
    { path: 'roles', component: RoleListComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}

