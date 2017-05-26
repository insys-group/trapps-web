import { Address } from './address.model';
import { Business } from './business.model';
import { Training, TrainingTask } from './training.model';
import { RestResource } from './rest.model';
import {Skill} from "./role.model";

export class Person extends RestResource {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  personType: string;
  title: string;
  business: Business;
  address: Address;
  personDocuments: Array<PersonDocument> = [];
  personSkills: Array<PersonSkill>=[];
  personTrainings: Array<PersonTraining>=[];
}

export class PersonSkill extends RestResource {
  person: Person;
  skill: Skill;
  scale: number;
}

export class PersonDocument extends RestResource {
  id: number;
  fileName: string;
  fileSize: number;
  date: Date;
  s3key: string;
}

export class PersonType {
    static ALL : string = "All";
    static CLIENT : string = "Client";
    static EMPLOYEE : string = "Employee";
    static CANDIDATE : string = "Candidate";
    static PIVOTAL : string = "Pivotal";
    static PLABS : string = "Pivotal-Labs";
    static VENDOR : string = "Vendor";
}

export class PersonTraining extends RestResource{
    id: number;
    startDate: number = new Date().getDate();
    endDate: number = new Date().getDate();
    progress: ProgressType;
    training: Training;
    hided: boolean;
    completedTasks: Array<TrainingTask> = [];
}

export class ProgressType {
    static NOT_STARTED: string = "NOT_STARTED";
    static IN_PROGRESS: string = "IN_PROGRESS";
    static COMPLETED: string = "COMPLETED";
}