import { IResource } from '../resources/crud.resource';

export class Role extends IResource {
    id: number;
    name: string;
    skills: Skill[];
}

export class Skill {
    id: number;
    name: string;
}