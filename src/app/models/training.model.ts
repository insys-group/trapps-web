import { RestResource } from './rest.model';
import { Person } from './person.model';
import { Address } from './address.model';

export class Training extends RestResource {
  id: number;
  name: string;
  location: Address = new Address();
  online: boolean;
  tasks: TrainingTask[];
}

export class TrainingTask {
    id: number;
    name: string;
    weblink: string;
    description: string;
}
