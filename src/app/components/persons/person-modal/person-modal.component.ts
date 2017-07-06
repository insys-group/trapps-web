import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-person-modal',
  templateUrl: './person-modal.component.html',
  styleUrls: ['./person-modal.component.css']
})

export class PersonModalComponent implements OnInit {

  @Output()
  loadPersons: EventEmitter<string> = new EventEmitter();

  @Output()
  saveCandidate: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {

  }

  public visible = false;
  public visibleAnimate = false;

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public save(): void {
    this.saveCandidate.emit();
    this.hide();
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      console.log('onContainerClicked');
      this.loadPersons.emit();
      this.hide();
    }
  }

}