import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonComponent } from './components/persons/person/person.component';
import { PersonListComponent } from './components/persons/person-list/person-list.component';
import { BusinessComponent } from './components/businesses/business/business.component';
import { BusinessListComponent } from './components/businesses/business-list/business-list.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'persons'},
    { path: 'persons', component: PersonListComponent},
    { path: 'person/:id', component: PersonComponent},
    { path: 'businesses', component: BusinessListComponent},
    { path: 'business/:id', component: BusinessComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}

