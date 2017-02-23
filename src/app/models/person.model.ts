import { Address } from './address.model';
import { Business } from './business.model';
import { Training, TrainingTask } from './training.model';
import { RestResource } from './rest.model';
import { Observable } from 'rxjs/Observable';

export class Person extends RestResource {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  personType: string;
  title: string;
  business: Business = new Business();
  address: Address = new Address();
  personDocuments: Array<PersonDocument> = [];
  personSkills: Array<PersonSkill>=[];
  personTrainings: Array<PersonTraining>=[];
}

export class PersonSkill extends RestResource {
  id: number;
  name: string;
  scale: number;
}

export class PersonDocument extends RestResource {
  id: number;
  fileName: string;
  uploadTimestamp: Date;
  downloadLink: string
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
    completedTasks: Array<TrainingTask>=[];
}

export class ProgressType {
    static NOT_STARTED: string = "NOT_STARTED";
    static IN_PROGRESS: string = "IN_PROGRESS";
    static COMPLETED: string = "COMPLETED";
}