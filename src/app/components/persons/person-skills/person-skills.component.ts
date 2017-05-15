import {
  Component, Input, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit,
  AfterViewChecked, Output, EventEmitter
} from '@angular/core';
import { Person, PersonSkill } from '../../../models/person.model';
import { RestService } from '../../../services/rest.service';
import { NotificationService } from '../../../services/notification.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/merge';
import {RoleService} from "../../../services/role.service";
import {LoadingService} from "../../../services/loading.service";
import {Skill} from "../../../models/role.model";
import {PersonService} from "../../../services/person.service";
//import 'rxjs/add/operator/mergeDelayError';

@Component({
  selector: 'app-person-skills',
  templateUrl: './person-skills.component.html',
  styleUrls: ['./person-skills.component.css']
})

export class PersonSkillsComponent implements OnInit {

  constructor(private roleService: RoleService,
              private personService: PersonService,
              private loadingService: LoadingService,
              private notificationService: NotificationService)
  { }

  @Input()
  person: Person;

  @Output()
  persistPerson:EventEmitter<string> = new EventEmitter();

  save() {
    this.persistPerson.emit();
  }

  skills;
  scales = [10,9,8,7,6,5,4,3,2,1];

  currentSkill: Skill;
  scale: number=0;
  exists: boolean = true;

  ngOnInit() {
    this.getSkills();
  }

  getSkills() {
    this.loadingService.show();
    this.roleService.getAllSkills()
      .subscribe(
        skills => {
          this.loadingService.hide();
          if (skills[0] && skills[0].id) {
            this.skills = skills;
          }
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error)
        }
      )
  }

  addSkill(): void {
    let newSkill = new PersonSkill();
    newSkill.skill = this.currentSkill;
    newSkill.scale = this.scale;
    this.person.personSkills.push(newSkill);
    this.save();
    delete this.currentSkill;
    delete this.scale;
  }

  removeSkill(index): void {
    this.person.personSkills.splice(index, 1);
    this.save();
  }

}