import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Person, PersonType, PersonSkill, PersonDocument} from '../../../models/person.model';
import {Address} from '../../../models/address.model';
import {Business} from '../../../models/business.model';
import {Link, Locations} from '../../../models/rest.model';
import {RestService} from '../../../services/rest.service';
import {NotificationService} from '../../../services/notification.service'
import {Router} from '@angular/router';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {AddressComponent} from '../../addresses/address/address.component';
import {PersonSkillsComponent} from '../person-skills/person-skills.component';
import {PersonDocumentsComponent} from '../person-documents/person-documents.component';

import {AfterViewInit, AfterViewChecked, ViewChildren, ViewChild, ContentChildren, ContentChild} from '@angular/core';

import 'rxjs/add/operator/take';
import {LoadingService} from "../../../services/loading.service";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user.model";
import {ConfirmService} from "../../../services/confirm.service";
import {BusinessService} from "../../../services/business.service";
import {PersonService} from "../../../services/person.service";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

export class PersonComponent implements OnInit {
  //used when navigation is used
  id: number;
  personType: string;

  //person object to show on the view
  person: Person = new Person();
  user: User;

  //lookups
  personTypes: string[] = [PersonType.EMPLOYEE, PersonType.CANDIDATE, PersonType.CLIENT, PersonType.VENDOR, PersonType.PIVOTAL];
  businesses: Array<Business>;
  selectedBusiness: string;

  //to show/hide the views 
  skills: boolean;
  trainings: boolean;
  documents: boolean;
  address: boolean;

  //all child views
  @ViewChild(AddressComponent)
  private addressComponent: AddressComponent;

  @ViewChild(PersonSkillsComponent)
  private personSkillsComponent: PersonSkillsComponent;

  @ViewChild(PersonDocumentsComponent)
  private personDocumentsComponent: PersonDocumentsComponent;

  constructor(private businessService: BusinessService,
              private personService: PersonService,
              private route: ActivatedRoute,
              private location: Location,
              private notificationService: NotificationService,
              private userService: UserService,
              private loadingService: LoadingService,
              private confirmService: ConfirmService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadBusinesses();
    });
  }

  onPersonTypeChange(): void {
    this.initDefaults();
  }

  private initDefaults(): void {
    this.address = true;
    if(this.id && !this.person.address){
      this.person.address = new Address();
    }
    if (this.person.personType === PersonType.EMPLOYEE) {
      this.skills = true;
      this.documents = true;
      this.trainings = true;
    } else if (this.person.personType === PersonType.CANDIDATE) {
      this.skills = true;
      this.documents = true;
      this.trainings = false;
    } else {
      this.skills = false;
      this.documents = false;
      this.trainings = false;
    }
  }

  loadBusinesses() {
    this.loadingService.show();
    this.businessService.getAll()
      .subscribe(
        businesses => {
          this.loadingService.hide();
          this.businesses = businesses;
          if(this.id){
            this.loadPerson();
          } else {
            this.initDefaults();
          }
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error);
        }
      );
  }

  loadPerson() {
    this.loadingService.show();
    this.personService.getPerson(this.id)
      .subscribe(
        person => {
          console.log(person);
          // this.loadingService.hide();
          this.person = person;
          //Get person business
          this.personService.getBusiness(this.person)
            .subscribe(
              business => {
                this.loadingService.hide();
                this.person.business = business;
                this.autopopulateEmployer();
              },
              error => {
                this.loadingService.hide();
                this.notificationService.notifyError(error);
              }
            );
          this.initDefaults();
          this.getUser();
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error);
        }
      );
  }

  getUser() {
    this.loadingService.show();
    this.userService.getUserByPersonId(this.person.id)
      .subscribe(
        user => {
          this.loadingService.hide();
          if (user) {
            this.user = user;
          }
        },
        error => {
          this.loadingService.hide();
          // this.notificationService.notifyError(error);
        }
      );
  }

  save(): void {
    // console.log(this.person);
    if(this.isAddressEmpty()){
      delete this.person.address;
    }

    this.loadingService.show();
    this.personService.checkEmail(this.person)
      .subscribe(
        exists => {
          this.loadingService.hide();
          if(exists){
            this.notificationService.error('The email is already occupied by another user.');
          } else {
            this.persist();
          }
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error);
        }
      );

  }

  persist(): void {
    this.loadingService.show();
    this.personService.savePerson(this.person)
      .subscribe(
        person => {
          this.loadingService.hide();
          this.id = person.id;
          this.loadPerson();
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error);
        }
      );
  }

  cancel(): void {
    this.location.back();
  }

  autopopulateEmployer() {
    if(this.businesses && this.person.business){
      this.businesses.forEach(business => {
          if(business.id === this.person.business.id){
            this.person.business = business;
          }
        }
      )
    }
  }

  createUser() {
    let self = this;
    this.confirmService.confirm(
      'Are you sure you want to create the user?',
      'An email will be sent to the email provided.',
      function () {
        self.loadingService.show();
        self.userService.create(self.person.id)
          .subscribe(
            user => {
              self.loadingService.hide();
              if (user) {
                self.user = user;
              }
            },
            error => {
              self.loadingService.hide();
              // this.notificationService.notifyError(error);
            }
          );
      }
    );
  }

  removeUser() {
    let self = this;
    this.confirmService.confirm(
      'Are you sure you want to remove the user?',
      '',
      function () {
        self.loadingService.show();
        self.userService.remove(self.user)
          .subscribe(
            user => {
              self.loadingService.hide();
              self.loadPerson();
            },
            error => {
              self.loadingService.hide();
              self.notificationService.notifyError(error)
            }
          );
      }
    );
  }

  isAddressEmpty() {
    return !this.person.address ||
      (!this.person.address.address1 && !this.person.address.address2 || !this.person.address.city
      || !this.person.address.state || !this.person.address.zipCode)
  }

}