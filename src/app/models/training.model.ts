import { RestResource } from './rest.model';
import { Person } from './person.model';
import { Address } from './address.model';

export class Training extends RestResource {
  id: number;
  name: string;
  trainees: Person[];
  progress: ProgressType;
  location: Address = new Address();
  online: boolean;
  weblink: string;
  startDate: Date;
  endDate: Date;
  tasks: TrainingTask[];
}

export class ProgressType {
  static NOT_STARTED: string = "NOT_STARTED";
  static IN_PROGRESS: string = "IN_PROGRESS";
  static COMPLETED: string = "COMPLETED";
}

export class TrainingTask {
    id: number;
    name: string;
    weblink: string;
    completed: boolean;
}
