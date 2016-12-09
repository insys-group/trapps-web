import { Component, Input, OnInit } from '@angular/core';
import { PersonDocument } from '../../../models/person.model';
import { PersonService } from '../../../services/person.service';
import { NotificationService } from '../../../services/notification.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/merge';
//import 'rxjs/add/operator/mergeDelayError';

@Component({
  selector: 'app-person-documents',
  templateUrl: './person-documents.component.html',
  styleUrls: ['./person-documents.component.css']
})

export class PersonDocumentsComponent implements OnInit {
  constructor(private personService: PersonService, private notificationService: NotificationService) { }
  @Input()
  personId: number;

  PersonDocuments: PersonDocument[];
  _PersonDocuments: PersonDocument[];

  skillName: string;
  selectedPersonDocuments: PersonDocument[];
  exists: boolean = true;

  ngOnInit() {
    this.personService.getPersonDocuments(this.personId)
      .subscribe(
      PersonDocuments => {
        this.PersonDocuments = PersonDocuments;
        this._PersonDocuments = this.copySkills(PersonDocuments);
      },
      this.handleError
      );
  }

  addDocument(): void {
    let newSkill = new PersonDocument();
    newSkill.id = 0;
    newSkill.name = this.skillName;
    newSkill.personId = this.personId;
    this.PersonDocuments.push(newSkill);
    this.exists = true;
    this.skillName = '';
  }

  removeSkill(skillName: string): void {
    console.log(`Skill to be removed ${skillName}`);
    let index = this.PersonDocuments.findIndex(skill => skill.name === skillName);
    console.log(`Skill Index ${index}`);
    this.PersonDocuments.splice(index, 1);
  }

  saveSkills(): void {
    let errorRecords: any[] = [];
    let newSkills: PersonDocument[] = this.findNotIn(this.PersonDocuments, this._PersonDocuments);
    let deletedSkills: PersonDocument[] = this.findNotIn(this._PersonDocuments, this.PersonDocuments);
    
    let saveObservable = this.saveAll(newSkills);
    let deleteObservable = this.deleteAll(deletedSkills);

    let allObservable = Observable.merge(saveObservable, deleteObservable)
    .subscribe(
      () => console.log('Successfull'),
      error => {console.error(`Error ${JSON.stringify(error)}`); errorRecords.push(error);},
      () => {
        if(errorRecords.length>0) {
          let data = errorRecords.map(record => {return JSON.stringify(record);}).concat('<br>');
          this.notificationService.error(`Error occured while saving data ${data}`);
        } else {
          this.notificationService.info('Skills saved successfully');
        }
      }
    );
  }

  private deleteAll(documents: PersonDocument[]): Observable<any> {
    let httpCounter: Array<number> = [];
    return Observable.create(observer => {
      documents.forEach(skill => {
        console.log(`Creating Skill ${skill.name}`);
        this.personService.deleteSkill(skill.id)
          .subscribe(
            skill => observer.next(),
            error => {
              observer.error(error);
              httpCounter.push(1);
              if (httpCounter.length === documents.length) {
                observer.complete();
              }
            },
            () => {
              httpCounter.push(1);
              if (httpCounter.length === documents.length) {
                observer.complete();
              }
            }
          );
      });
    });
  }

  private saveAll(documents: PersonDocument[]): Observable<any> {
    let httpCounter: Array<number> = [];
    return Observable.create(observer => {
      documents.forEach(skill => {
        console.log(`Creating Skill ${skill.name}`);
        // if(skill.name==='Spark' || skill.name==='AWS') {
        //   observer.error(`Skill ${skill.name} cannot be saved.`);
        // } else {
          this.personService.createSkill(skill)
          .subscribe(
            skill => observer.next(skill),
            error => {
              observer.error(error);
              httpCounter.push(1);
              if (httpCounter.length === documents.length) {
                observer.complete();
              }
            },
            () => {
              httpCounter.push(1);
              if (httpCounter.length === documents.length) {
                observer.complete();
              }
            }
          );
        //}

      });
    });
  }

  private findNotIn(sourceSkills: PersonDocument[], targetSkills: PersonDocument[]): PersonDocument[] {
    let documents: PersonDocument[] = new Array<PersonDocument>();

    sourceSkills.forEach(skill => {
      let matchSkill = targetSkills.find(targetSkill => targetSkill.name.toLowerCase() === skill.name.toLowerCase());
      if (matchSkill === undefined) {
        documents.push(skill);
      }
    });

    return documents;
  }

  resetSkills(): void {
    console.log('Total Skills ' + this._PersonDocuments.length);
    this.PersonDocuments = this.copySkills(this._PersonDocuments);
  }

  onChange(event): void {
    let self = this;
    let result = this.PersonDocuments.find((skill, index, arr) => { return skill.name.toLowerCase() === this.skillName.toLowerCase(); });
    this.exists = result !== undefined;
  }

  private handleError(error: any): void {
    console.error('An error occurred', error);
    this.notificationService.error('An Error occured ' + error);
  }

  private copySkills(PersonDocuments: PersonDocument[]): PersonDocument[] {
    return PersonDocuments.map(skill => {
      let newSkill = new PersonDocument();
      newSkill.id = skill.id; newSkill.name = skill.name; newSkill.personId = skill.personId;
      return newSkill;
    });
  }

}
