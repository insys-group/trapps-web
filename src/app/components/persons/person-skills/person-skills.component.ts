import { Component, Input, OnInit } from '@angular/core';
import { PersonSkill } from '../../../models/person.model';
import { PersonService } from '../../../services/person.service';

@Component({
  selector: 'app-person-skills',
  templateUrl: './person-skills.component.html',
  styleUrls: ['./person-skills.component.css']
})

export class PersonSkillsComponent implements OnInit {
  constructor(private personService: PersonService) { }
  @Input()
  personId: number;

  personSkills: Array<PersonSkill> = new Array<PersonSkill>();

  ngOnInit() {
    
  }

}
