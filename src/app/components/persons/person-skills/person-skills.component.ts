import { Component, Input, OnInit } from '@angular/core';
import { PersonSkill } from '../../../models/person.model';
import { PersonService } from '../../../services/person.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-person-skills',
  templateUrl: './person-skills.component.html',
  styleUrls: ['./person-skills.component.css']
})

export class PersonSkillsComponent implements OnInit {
  constructor(private personService: PersonService, private notificationService: NotificationService) { }
  @Input()
  personId: number;

  personSkills: PersonSkill[];
  _personSkills: PersonSkill[];

  skillName: string;
  selectedPersonSkills: PersonSkill[];
  exists: boolean = true;

  ngOnInit() {
    this.personService.getPersonSkills(this.personId)
      .subscribe(
      personSkills => {
        this.personSkills = personSkills; 
        this._personSkills = this.copySkills(personSkills);
      },
      this.handleError
      );
  }

  addSkill(): void {
    let newSkill=new PersonSkill();
    newSkill.id=0;
    newSkill.name=this.skillName;
    newSkill.personId=this.personId;
    this.personSkills.push(newSkill);
    this.exists=true;
    this.skillName='';
  }

  removeSkill(skillName: string): void {
    console.log(`Skill to be removed ${skillName}`);
    let index=this.personSkills.findIndex(skill=>skill.name===skillName);
    console.log(`Skill Index ${index}`);
    this.personSkills.splice(index, 1);
  }

  saveSkills(): void {
    let newSkills: PersonSkill[] = this.findNotIn(this.personSkills, this._personSkills);
    let deletedSkills: PersonSkill[] = this.findNotIn(this._personSkills, this.personSkills);
    newSkills.forEach(skill => console.log(`New Skill ${skill.name}`));
    deletedSkills.forEach(skill => 
      {
        console.log(`Deleted Skill ${skill.name}`);
        this.personService.deleteSkill(skill.id)
          .subscribe(  
            () => console.log(`Delete Skill ${JSON.stringify(skill)}`), 
            this.handleError
          );
      }
    );
    this.personService.createSkills(newSkills)
    .subscribe(
      personSkills => personSkills.forEach(skill=>console.log(`Saved Skill ${JSON.stringify(skill)}`)),
      this.handleError
    );
  }

  private findNotIn(sourceSkills: PersonSkill[], targetSkills: PersonSkill[]): PersonSkill[] {
    let skills: PersonSkill[]=new Array<PersonSkill>();

    sourceSkills.forEach(skill=>{
      let matchSkill=targetSkills.find(targetSkill=>targetSkill.name===skill.name);
      if(matchSkill===undefined) {
        skills.push(skill);
      }
    });

    return skills;
  }

  resetSkills(): void {
    console.log('Total Skills ' + this._personSkills.length);
    this.personSkills=this.copySkills(this._personSkills);
  }

  onChange(event): void {
    let self=this;
    let result=this.personSkills.find((skill, index, arr) => {return skill.name===this.skillName;});
    this.exists=result !== undefined;
  }

  private handleError(error: any): void {
    console.error('An error occurred', error);
    this.notificationService.error('An Error occured ' + error);
  }

  private copySkills(personSkills: PersonSkill[]): PersonSkill[] {
    return personSkills.map(skill=> {
          let newSkill=new PersonSkill();
          newSkill.id=skill.id; newSkill.name=skill.name; newSkill.personId=skill.personId;
          return newSkill;
        });
  }

}
