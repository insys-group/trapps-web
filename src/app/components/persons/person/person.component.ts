import { Component, OnInit } from '@angular/core';
import { Person, PersonType } from '../../../models/person.model';
import { NewPersonService } from '../../../services/newperson.service';
import { NotificationService } from '../../../services/notification.service'
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { AddressComponent } from '../../addresses/address/address.component';
import { AfterViewInit, ViewChildren, ViewChild, ContentChildren, ContentChild } from '@angular/core';

import 'rxjs/add/operator/take';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

export class PersonComponent implements OnInit, AfterViewInit {
  person: Person = new Person();
  id: number;
  personType: string;
  personTypes: string[] = ['Employee', 'Candidate', 'Client', 'Vendor', 'Pivotal'];
  businesses: string[] = ['Comcast', 'Aptium', 'Pivotal', 'INSYS Group'];

  skills: boolean;
  documents: boolean;
  address: boolean;

  @ViewChild(AddressComponent)
  private addressComponent: AddressComponent;
 
  private findInArray(arr: Array<{rel : string; href: string}>, name: string): string {
    let result = arr.filter(item => item.rel === name)[0];
    return result.href;
  }

  ngAfterViewInit() {
    console.log(`Enter: PersonComponent.ngAfterViewInit() this.addressComponent= ${this.addressComponent} `);
     if (this.id > 0) {
        this.personService.getOne(this.id)
          .subscribe(
            person => {
              this.person = person; 
              this.init();
            if (this.person.links){
               let link = this.findInArray(this.person.links,'address');
               console.log(`Enter: PersonComponent.ngAfterViewInit() link= ${link} `);
               this.addressComponent.loadByUrl(link);
               this.person.address = this.addressComponent.address;
              }
            },
            error => this.handleError
          );
      } else {
        if(this.personType!='') {
          this.person.personType=this.personType;
        } else {
          this.person.personType='Employee';
        }
        this.init();
      }
    console.log(`Enter: PersonComponent.ngAfterViewInit() this.person.address= ${this.person.address} `);
  }

  constructor(
    private personService: NewPersonService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    console.log(`Enter: PersonComponent.ngOnInit()`);
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.personType=params['personType'];
      console.log(`Parameter Id is ${this.id}`);
    });
  }


  private init(): void {
    if(this.person.personType==='Employee' || this.person.personType==='Candidate') {
      this.personTypes = ['Employee', 'Candidate'];
      this.businesses = ['INSYS Group'];
      this.skills=true;
      this.documents=true;
    } else {
      this.personTypes = [this.person.personType];
      this.skills=false;
      this.documents=false;
    }
    this.address=true;
    this.person.business={
          "name" : "business_entity 1",
          "description" : "business_entity 1",
          "businessType" : "Insys",
          "id" : 15,
          "address": null};
  }

  save(): void {
    console.log('Enter: PersonComponent address.save() ' + this.addressComponent.address.id);
    this.addressComponent.saveSynh().subscribe(
        address => {
          this.addressComponent.address = address;
          this.person.address = address;
           console.log(`Enter:  PersonComponent address.save() ok address = ${JSON.stringify(address)}`);
           console.log(`Enter:  PersonComponent person.save()  ${JSON.stringify(this.person)}`);
            if(this.person.id) {
               this.personService.update(this.person).subscribe(person => this.handleSuccess(person)
              , error => {console.log(`Error:  PersonComponent person.update() `); this.handleError}
              );
            } else {
              this.personService.createNew(this.person).subscribe(person => this.handleSuccess(person)
              , error => {console.log(`Error:  PersonComponent person.save() `); this.handleError}
              );
            }
        },
        error => {console.log(`Error:  PersonComponent address.save() `); this.handleError}
    );
  }

  delete(): void {
    console.log('Enter: PersonComponent.delete()' );
    this.notificationService.ask('Do you really want to delete?', ["Yes", "No"])
      .subscribe(
        result => {
          if(result==='Yes') {
            this.personService.delete(this.person.id).subscribe(() => this.router.navigate(['/persons']), this.handleError);
          } else {
            console.log('Dont want to delete the record');
          }
        },
        () => null
      );
  }

  cancel(): void {
    this.location.back();
  }

  private handleError(error: any): void {
    console.error('An error occurred', error);
    this.notificationService.error('An Error occured ' + error);
  }

  private handleSuccess(person: Person): void {
    this.person=person;
    this.notificationService.info('Data saved successfully');
  }
}