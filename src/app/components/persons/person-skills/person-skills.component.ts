import { Component, Input, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Person, PersonSkill } from '../../../models/person.model';
import { RestService } from '../../../services/rest.service';
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

export class PersonSkillsComponent implements OnInit, OnChanges {
  constructor(private restService: RestService, private notificationService: NotificationService) { }

  @Input()
  person: Person;
  _personSkills: Array<PersonSkill>;

  scales:Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  skills:Array<string> = ['Spring', 'Cloud Foundry', 'JPA', 'REST', 'MySQL', 'Spark', 'Hadoop', 'Scala', 'AWS'];
  skillName: string;
  scale: number=0;
  exists: boolean = true;

  ngOnChanges() {
    console.log(`PersonSkillsComponent*************** ngOnChanges()`);
    if(this.person) {
      this._personSkills=this.copySkills(this.person.personSkills);
    }
    //this.personSkills=this.person.personSkills;
    //this._personSkills=this.copySkills(this.personSkills);
  }

  ngOnInit() {
    console.log(`PersonSkillsComponent*************** ngOnInit()`);
  }

  addSkill(): void {
    let newSkill = new PersonSkill();
    newSkill.id = 0;
    newSkill.name = this.skillName;
    newSkill.scale = this.scale;
    this.person.personSkills.push(newSkill);
    this.exists = true;
    this.skillName = '';
    this.scale=0;
  }

  removeSkill(skillName: string): void {
    console.log(`Skill to be removed ${skillName}`);
    let index = this.person.personSkills.findIndex(skill => skill.name === skillName);
    console.log(`Skill Index ${index}`);
    this.person.personSkills.splice(index, 1);
  }

  resetSkills(): void {
    console.log('Total Skills ' + this._personSkills.length);
    this.person.personSkills = this.copySkills(this._personSkills);
    this.skillName = '';
    this.scale=0;
  }

  onChange(event): void {
    let self = this;
    let result = this.person.personSkills.find((skill, index, arr) => { return skill.name.toLowerCase() === this.skillName.toLowerCase(); });
    this.exists = (result !== undefined);
  }

  private handleError(error: any): void {
    console.error('An error occurred', error);
    this.notificationService.error('An Error occured ' + error);
  }

  private copySkills(personSkills: Array<PersonSkill>): Array<PersonSkill> {
    return personSkills.map(skill => {
      let newSkill = new PersonSkill();
      newSkill.id = skill.id; newSkill.name = skill.name; newSkill.scale = skill.scale; newSkill.links = skill.links;
      return newSkill;
    });
  }


}

/*
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
        this.restService.create<PersonSkill>(environment.PERSON_SKILL_URL, skill)
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
*/

  /*
  public loadDataAsync(url: string): Observable<Array<PersonSkill>> {
    console.log('Enter: loadDataAsync()');
    return this.restService.getAll<PersonSkill>(url)
      .do(
        skills => {
          console.log(`Person skills loaded ${skills.length}`);
          this.skills = skills;
          this.skills.forEach(skill=>skill.person=this.person);
          this._skills = this.copySkills(this.skills);
          if(this.skillName) {
            this.exists=this.skills.find((skill, index, arr) => skill.name.toLowerCase() === this.skillName.toLowerCase()) !== undefined;
          } else {
            this.exists=false;
          }
          return this.skills;
        },
        this.handleError
      );
  }

  public isSaveReady(): boolean {
    return true;
  }

  public saveAsync(): Observable<Array<PersonSkill>> {
    let errorRecords: Array<any> = [];
    let newSkills: Array<PersonSkill> = this.findNotIn(this.skills, this._skills);
    let deletedSkills: Array<PersonSkill> = this.findNotIn(this._skills, this.skills);

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
  */
  /*
  public loadData(url: string): void {
    console.log('Enter: loadDataAsync()');
    this.restService.getAll<PersonSkill>(url)
      .do(skills => {console.log('Running Map '); return skills;})
      .subscribe(
        skills => {
          console.log(`Person skills loaded ${skills.length}`);
          this.skills = skills;
          this._skills = this.copySkills(skills);
          if(this.skillName) {
            this.exists=this.skills.find((skill, index, arr) => skill.name.toLowerCase() === this.skillName.toLowerCase()) !== undefined;
          } else {
            this.exists=false;
          }
        },
        this.handleError
      );
  }
  */
