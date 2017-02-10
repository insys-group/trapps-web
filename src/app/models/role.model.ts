import {RestResource} from "./rest.model";

export class Role extends RestResource {
    id: number;
    name: string;
    skills: Skill[];
}

export class Skill extends RestResource {
    id: number;
    name: string;
}