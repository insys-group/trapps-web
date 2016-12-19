import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Person, PersonType } from '../../../models/person.model';
import { Business } from '../../../models/business.model';
import { RestLocations } from '../../../models/rest.model';
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

  //Resource location for skills
  skillsUrl: string;

  //Resource location for documents
  documentsUrl: string;

  //person object to show on the view
  person: Person = new Person();

  //lookups
  personTypes: string[] = [PersonType.EMPLOYEE, PersonType.CANDIDATE, PersonType.CLIENT, PersonType.VENDOR, PersonType.PIVOTAL];
  businesses: Array<Business> = new Array<Business>();
  _businesses: Array<Business> = new Array<Business>();

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
  ) { }

  //executes when component initializes
  ngOnInit(): void {
    console.log(`Enter: PersonComponent.ngOnInit()`);
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.personType=params['personType'];
      console.log("After parsing query strings ********************  " + this.personType);
      if(this.personType===undefined || this.personType==='' || this.personType===PersonType.CANDIDATE || this.personType===PersonType.EMPLOYEE) {
        this.skills=true;
        this.documents=true;
      } else {
        this.skills=false;
        this.documents=false;
      }
      console.log(`Parameter Id is ${this.id}`);
      this.loadBusinesses()
        .subscribe(
          businesses => {
            if (this.id > 0) {
              this.loadPerson().subscribe (
                person => {
                  this.initExistingPerson();
                  if (this.person.links) {
                    this.initBusiness();
                    this.initAddress();
                    if(this.skills) {
                      this.initSkills();
                    }
                    if(this.documents) {
                      this.initDocuments();
                    }
                  }
                },
                error => {}
              );
            } else {
              this.initNewPerson();
            }
          }
        );
    });
  }

  ngAfterViewInit(): void {
/*
    if(this.personType==='' || this.personType===PersonType.CANDIDATE || this.personType===PersonType.EMPLOYEE) {
      this.skills=true;
      this.documents=true;
      this.initSkills();
      this.initDocuments();
    } else {
      this.skills=false;
      this.documents=false;
    }
    */
  }

  //sets the view state based on the request parameters
  private initNewPerson(): void {
    if(this.personType!='') {
      this.person.personType=this.personType;
    } else {
      this.person.personType=PersonType.EMPLOYEE;
    }
    this.initDefaults();
  }

  private initExistingPerson(): void {
    this.initDefaults();
  }

  private initDefaults(): void {
    if(this.person.personType===PersonType.EMPLOYEE || this.person.personType===PersonType.CANDIDATE) {
      this.personTypes = [PersonType.EMPLOYEE, PersonType.CANDIDATE];
    } else {
      this.personTypes = [this.person.personType];
    }
    this.address=true;
  }

  private loadBusinesses(): Observable<Array<Business>> {
    console.log(`Loading businesses data`);
    return this.restService.getAll<Business>(RestLocations.BUSINESS_URL)
    .do(
      businesses => {
        this._businesses=
          businesses.map(business => {
            let personBusiness=new Business();
            personBusiness.id=business.id;
            personBusiness.name=business.name;
            return personBusiness;
          });
        
        if(this.person.personType==='Employee' || this.person.personType==='Candidate') {
          let business = this._businesses.find(business => business.name.toUpperCase().indexOf('INSYS')>=0);
          this.businesses = [business];
        } else {
          this.businesses=this._businesses;
        }
      },
      error => this.handleError('Loading list of businesses failed.')
    );
  }

  loadPerson(): Observable<Person> {
    console.log(`Loading person data`);
    return this.restService.getOne<Person>(`${RestLocations.PERSON_URL}${this.id}`)
      .do(
        person => this.person = person,
        error => this.handleError
      );
  }

  private initBusiness(): void {
    console.log(`Enter: initBusiness() - Loading current business. All businesses loaded count ${this.businesses.length}`);
    let link = this.restService.getLink("business", this.person.links);
    if(link) {
      console.log(`Enter: PersonComponent.initBusiness() link= ${link.href} `);
      this.restService.getOne<Business>(link.href)
      .subscribe(
        business => {
          let personBusiness=new Business();
          personBusiness.id=business.id;
          personBusiness.name=business.name;
          this.person.business=personBusiness; 
          console.log(`Assigning the Employer ${JSON.stringify(this.person.business)}`);
        },
        error => this.handleError('Loading business info failed')
      );
    }
  }

  private initAddress(): void {
    let link = this.restService.getLink("address", this.person.links);
    if(link) {
      console.log(`Enter: PersonComponent.initAddress() link= ${link} `);
      this.addressComponent.loadByUrl(link.href);
      this.person.address = this.addressComponent.address;
    }
  }

  private initDocuments(): void {
    let link = this.restService.getLink("documents", this.person.links);
    console.log(`Enter: PersonComponent.initDocuments() link= ${link} `);
    //this.addressComponent.loadByUrl(link);
    //this.person.address = this.addressComponent.address;
  }

  private initSkills(): void {
    let link = this.restService.getLink("skills", this.person.links);
    console.log(`Enter: PersonComponent.initSkills() link= ${link} `);
    this.skillsUrl=link.href;
    /*
    this.personSkillsComponent.loadDataAsync(link.href)
    .subscribe(
      skills => console.log(`Skills loaded ${skills.length}`),
      () => {}
    );*/ 
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
               this.restService.update<Person>(this.person).subscribe(person => this.handleSuccess(person)
              , error => {console.log(`Error:  PersonComponent person.update() `); this.handleError}
              );
            } else {
              this.restService.create<Person>(RestLocations.PERSON_URL, this.person).subscribe(person => this.handleSuccess(person)
              , error => {console.log(`Error:  PersonComponent person.save() `); this.handleError}
              );
            }
        },
        error => {console.log(`Error:  PersonComponent address.save() `); this.handleError}
    );
  }

  delete(): void {
    console.log('Enter: PersonComponent.delete()');
    this.notificationService.ask('Do you really want to delete?', ["Yes", "No"])
      .subscribe(
        result => {
          if(result==='Yes') {
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

  onChange(event: any): void {
    console.log(`value is ${JSON.stringify(this.person.business)}`);
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