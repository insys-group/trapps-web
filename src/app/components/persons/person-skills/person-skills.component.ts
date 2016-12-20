import { Component, Input, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Person, PersonSkill, ChildViewComponent } from '../../../models/person.model';
import { RestService } from '../../../services/rest.service';
import { RestLocations } from '../../../models/rest.model';
import { NotificationService } from '../../../services/notification.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/merge';
//import 'rxjs/add/operator/mergeDelayError';

@Component({
  selector: 'app-person-skills',
  templateUrl: './person-skills.component.html',
  styleUrls: ['./person-skills.component.css']
})

export class PersonSkillsComponent implements ChildViewComponent, OnInit, OnChanges {
  constructor(private restService: RestService, private notificationService: NotificationService) { }

  @Input()
  person: Person;

  @Input()
  personSkills: Array<PersonSkill>;
  _personSkills: Array<PersonSkill>;

  skillName: string;
  exists: boolean = true;

  ngOnChanges() {
    this.personSkills=this.person.skills;
    console.log(`PersonSkillsComponent*************** ngOnChanges()`);
  }

  ngOnInit() {
    console.log(`PersonSkillsComponent*************** ngOnInit()`);
  }

  addSkill(): void {
    let newSkill = new PersonSkill();
    newSkill.id = 0;
    newSkill.name = this.skillName;
    newSkill.person = this.person;
    newSkill.scale = 0;
    this.personSkills.push(newSkill);
    this.exists = true;
    this.skillName = '';
  }

  removeSkill(skillName: string): void {
    console.log(`Skill to be removed ${skillName}`);
    let index = this.personSkills.findIndex(skill => skill.name === skillName);
    console.log(`Skill Index ${index}`);
    this.personSkills.splice(index, 1);
  }

  saveSkills(): void {
    this.saveAsync()
    .subscribe(
      data => {},
      error => this.notificationService.error(`Error while saving skills ${JSON.stringify(error)}`),
      () => this.notificationService.info(`Skills saved successfully`)
    );
  }

  private deleteAll(skills: Array<PersonSkill>): Observable<Array<PersonSkill>> {
    let httpCounter: Array<number> = [];
    return Observable.create(observer => {
      skills.forEach(skill => {
        console.log(`Deleting Skill ${skill.name}`);
        this.restService.delete<PersonSkill>(skill)
          .subscribe(
            skill => observer.next(),
            error => {
              observer.error(error);
              httpCounter.push(1);
              if (httpCounter.length === skills.length) {
                observer.complete();
              }
            },
            () => {
              httpCounter.push(1);
              if (httpCounter.length === skills.length) {
                observer.complete();
              }
            }
          );
      });
    });
  }

  private saveAll(skills: Array<PersonSkill>): Observable<any> {
    let httpCounter: Array<number> = [];
    return Observable.create(observer => {
      skills.forEach(skill => {
        console.log(`Creating Skill ${skill.name}`);
        this.restService.create<PersonSkill>(RestLocations.PERSON_SKILL_URL, skill)
        .subscribe(
          skill => observer.next(skill),
          error => {
            observer.error(error);
            httpCounter.push(1);
            if (httpCounter.length === skills.length) {
              observer.complete();
            }
          },
          () => {
            httpCounter.push(1);
            if (httpCounter.length === skills.length) {
              observer.complete();
            }
          }
        );
      });
    });
  }

  private findNotIn(sourceSkills: PersonSkill[], targetSkills: PersonSkill[]): PersonSkill[] {
    let skills: PersonSkill[] = new Array<PersonSkill>();

    sourceSkills.forEach(skill => {
      let matchSkill = targetSkills.find(targetSkill => targetSkill.name.toLowerCase() === skill.name.toLowerCase());
      if (matchSkill === undefined) {
        skills.push(skill);
      }
    });

    return skills;
  }

  resetSkills(): void {
    console.log('Total Skills ' + this._personSkills.length);
    this.personSkills = this.copySkills(this._personSkills);
  }

  onChange(event): void {
    let self = this;
    let result = this.personSkills.find((skill, index, arr) => { return skill.name.toLowerCase() === this.skillName.toLowerCase(); });
    this.exists = result !== undefined;
  }

  private handleError(error: any): void {
    console.error('An error occurred', error);
    this.notificationService.error('An Error occured ' + error);
  }

  private copySkills(personSkills: Array<PersonSkill>): Array<PersonSkill> {
    return personSkills.map(skill => {
      let newSkill = new PersonSkill();
      newSkill.id = skill.id; newSkill.name = skill.name; newSkill.scale = skill.scale; newSkill.person = skill.person; newSkill.links = skill.links;
      return newSkill;
    });
  }

  public loadDataAsync(url: string): Observable<Array<PersonSkill>> {
    console.log('Enter: loadDataAsync()');
    return this.restService.getAll<PersonSkill>(url)
      .do(
        personSkills => {
          console.log(`Person skills loaded ${personSkills.length}`);
          this.personSkills = personSkills;
          this.personSkills.forEach(skill=>skill.person=this.person);
          this._personSkills = this.copySkills(this.personSkills);
          if(this.skillName) {
            this.exists=this.personSkills.find((skill, index, arr) => skill.name.toLowerCase() === this.skillName.toLowerCase()) !== undefined;
          } else {
            this.exists=false;
          }
          return this.personSkills;
        },
        this.handleError
      );
  }

  public isSaveReady(): boolean {
    return true;
  }

  public saveAsync(): Observable<Array<PersonSkill>> {
    let errorRecords: Array<any> = [];
    let newSkills: Array<PersonSkill> = this.findNotIn(this.personSkills, this._personSkills);
    let deletedSkills: Array<PersonSkill> = this.findNotIn(this._personSkills, this.personSkills);

    let saveObservable = this.saveAll(newSkills);
    let deleteObservable = this.deleteAll(deletedSkills);

    let allObservable = Observable.merge(saveObservable, deleteObservable)
      .do (
      () => console.log('Successfull'),
      error => { console.error(`Error ${JSON.stringify(error)}`); errorRecords.push(error); },
      () => {
        if (errorRecords.length > 0) {
          let data = errorRecords.map(record => { return JSON.stringify(record); }).concat('<br>');
          this.notificationService.error(`Error occured while saving data ${data}`);
        } else {
          this.notificationService.info('Skills saved successfully');
        }
      }
      );
      return allObservable;
  }

  public save(): void {
    
  }

}
  /*
  public loadData(url: string): void {
    console.log('Enter: loadDataAsync()');
    this.restService.getAll<PersonSkill>(url)
      .do(personSkills => {console.log('Running Map '); return personSkills;})
      .subscribe(
        personSkills => {
          console.log(`Person skills loaded ${personSkills.length}`);
          this.personSkills = personSkills;
          this._personSkills = this.copySkills(personSkills);
          if(this.skillName) {
            this.exists=this.personSkills.find((skill, index, arr) => skill.name.toLowerCase() === this.skillName.toLowerCase()) !== undefined;
          } else {
            this.exists=false;
          }
        },
        this.handleError
      );
  }
  */
