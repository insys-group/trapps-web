import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Person, PersonType, PersonSkill, PersonDocument } from '../../../models/person.model';
import { Address } from '../../../models/address.model';
import { Business } from '../../../models/business.model';
import { RestLocations, Link } from '../../../models/rest.model';
import { RestService } from '../../../services/rest.service';
import { NotificationService } from '../../../services/notification.service'
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { AddressComponent } from '../../addresses/address/address.component';
import { PersonSkillsComponent } from '../person-skills/person-skills.component';
import { PersonDocumentsComponent } from '../person-documents/person-documents.component';

import { AfterViewInit, AfterViewChecked, ViewChildren, ViewChild, ContentChildren, ContentChild } from '@angular/core';

import 'rxjs/add/operator/take';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

export class PersonComponent implements OnInit, AfterViewInit {
  //used when navigation is used
  id: number;
  personType: string;

  //person object to show on the view
  person: Person = new Person();
  personAddress: Address = new Address();

  //lookups
  personTypes: string[] = [PersonType.EMPLOYEE, PersonType.CANDIDATE, PersonType.CLIENT, PersonType.VENDOR, PersonType.PIVOTAL];
  businesses: Array<string> = new Array<string>();
  _businesses: Array<Business> = new Array<Business>();
  selectedBusiness: string;

  //to show/hide the views 
  skills: boolean;
  documents: boolean;
  address: boolean;

  //all child views
  @ViewChild(AddressComponent)
  private addressComponent: AddressComponent;

  @ViewChild(PersonSkillsComponent)
  private personSkillsComponent: PersonSkillsComponent;

  @ViewChild(PersonDocumentsComponent)
  private personDocumentsComponent: PersonDocumentsComponent;

  constructor(
    private restService: RestService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private notificationService: NotificationService
  ) {
    console.log(`Enter: PersonComponent()`);
      console.log(`Initializing address`);
      this.personAddress.address1='';
      this.personAddress.address2='';
      this.personAddress.city='';
      this.personAddress.state='';
      this.personAddress.zipCode='';
  }

  //executes when component initializes
  ngOnInit(): void {
    console.log(`Enter: PersonComponent.ngOnInit()`);
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.personType = params['personType'];
      console.log(`Parameter Id is ${this.id}`);
      this.loadBusinesses()
        .subscribe(
        businesses => {
          if (this.id > 0) {
            this.loadPerson().subscribe(
              person => {
                this.initExistingPerson();
                if (this.person.links) {
                  this.initBusiness();
                }
              },
              error => { }
            );
          } else {
            this.initNewPerson();
          }
        }
        );
    });
  }

  ngAfterViewInit(): void {
  }

  //sets the view state based on the request parameters
  private initNewPerson(): void {
    if (this.personType) {
      this.person.personType = this.personType;
    } else {
      this.person.personType = PersonType.EMPLOYEE;
    }
    this.initDefaults();
    this.selectedBusiness=this.businesses[0];
    this.person.business = this._businesses.find(b => b.name === this.selectedBusiness);
  }

  private initExistingPerson(): void {
    this.initDefaults();
  }

  private initDefaults(): void {
    if (this.person.personType === PersonType.EMPLOYEE || this.person.personType === PersonType.CANDIDATE) {
      this.personTypes = (this.person.personType === PersonType.EMPLOYEE?[PersonType.EMPLOYEE]:[PersonType.EMPLOYEE, PersonType.CANDIDATE]);
      this.skills = true;
      this.documents = true;
      let business = this._businesses.find(business => business.name.toUpperCase().indexOf('INSYS') >= 0);
      this.businesses = [business.name];
    } else {
      this.personTypes = [this.person.personType];
      this.skills = false;
      this.documents = false;
      this.businesses = this._businesses.filter(business => {
      console.log(`business ${business.businessType} ${this.person.personType}`);
      return business.businessType===this.person.personType;
      }).map(b => b.name);
    }
    this.address = true;
  }

  private loadBusinesses(): Observable<Array<Business>> {
    console.log(`Loading businesses data`);
    return this.restService.getAll<Business>(RestLocations.BUSINESS_URL)
      .do(
      businesses => {
        this._businesses =
          businesses.map(business => {
            let personBusiness = new Business();
            personBusiness.id = business.id;
            personBusiness.name = business.name;
            personBusiness.businessType = business.businessType;
            personBusiness.description = business.description;
            return personBusiness;
          });
      },
      error => this.handleError('Loading list of businesses failed.')
      );
  }

  loadPerson(): Observable<Person> {
    console.log(`Loading person data`);
    return this.restService.getOne<Person>(`${RestLocations.PERSON_URL}${this.id}`)
      .do(
      person => {
        this.initPerson(person);
        console.log(`Person loaded is ${JSON.stringify(person)}`);
      },
      error => this.handleError
      );
  }

  private initPerson(person: Person): void {
    this.person = person;
    this.person.personSkills=this.person.personSkills
      .map(skill => {let s=new PersonSkill(); s.id=skill.id;s.name=skill.name; s.scale=skill.scale; return s;});
    this.personAddress=this.person.address;
  }

  private initBusiness(): void {
    console.log(`Enter: initBusiness() - Loading current business. All businesses loaded count ${this.businesses.length}`);
    let link = this.restService.getLink("business", this.person.links);
    if (link) {
      console.log(`Enter: PersonComponent.initBusiness() link= ${link.href} `);
      this.restService.getOne<Business>(link.href)
        .subscribe(
        business => {
          let personBusiness = new Business();
          personBusiness.id = business.id;
          personBusiness.name = business.name;
          personBusiness.businessType = business.businessType;
          personBusiness.description = business.description;
          this.person.business = personBusiness;
          this.selectedBusiness = business.name;
          console.log(`Assigning the Employer ${JSON.stringify(this.person.business)}`);
        },
        error => this.handleError('Loading business info failed')
        );
    }
  }

  save(): void {
    console.log(`Enter: PersonComponent save() ${JSON.stringify(this.person)}`);
    if(this.isAddressEmpty()) {
      console.log('Looks like Address is empty***********');
      this.person.address=null;
    } else {
      this.person.address=this.personAddress;
    }
    if(this.person.id > 0) {
      this.restService.put<Person>(RestLocations.PERSON_UPDATE_URL+this.person.id, this.person)
      .subscribe(
        () => this.notificationService.info('Data saved successfully'),
        error => this.notificationService.error(`Error occured while saving data ${JSON.stringify(error)}`)
      );
    } else {
      this.restService.create<Person>(RestLocations.PERSON_URL, this.person)
      .subscribe (
        person => {
          let business=this.person.business; this.initPerson(person); 
          this.person.business=business; 
          if(this.person.address) {
            this.personAddress.id=this.person.address.id;
          }
          this.notificationService.info('Data saved successfully');
        },
        error => this.notificationService.error(`Error occured while saving data ${JSON.stringify(error)}`)
      );
    }
  }

  delete(): void {
    console.log('Enter: PersonComponent.delete()');
    this.notificationService.ask('Do you really want to delete?', ["Yes", "No"])
      .subscribe(
      result => {
        if (result === 'Yes') {
          this.restService.delete(this.person.id).subscribe(() => this.router.navigate(['/persons']), this.handleError);
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

  onChange(): void {
    console.log(`onChange selectedBusiness = ${this.selectedBusiness}`);
    this.person.business = this._businesses.find(b => b.name === this.selectedBusiness);
    console.log(`Person Business is - ${JSON.stringify(this.person.business)}`);
  }

  isAddressEmpty(): boolean {
    console.log(`Address is ${this.personAddress.address1} ${this.personAddress.address2} ${this.personAddress.city} ${this.personAddress.state} ${this.personAddress.zipCode}`);
    return this.isStringEmpty(this.personAddress.address1) && this.isStringEmpty(this.personAddress.city) && 
    this.isStringEmpty(this.personAddress.state) && this.isStringEmpty(this.personAddress.zipCode);
  }

  isStringEmpty(str: string): boolean {
    if(str) {
      if(str.trim()) return false; else return true;
    }
    return true;
  }

  private handleError(error: any): void {
    console.error('An error occurred', error);
    this.notificationService.error('An Error occured ' + error);
  }
  /*
  private handleSuccess(person: Person): void {
    this.person = person;
    this.notificationService.info('Data saved successfully');
  }*/
}