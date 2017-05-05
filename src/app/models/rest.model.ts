import { Response } from '@angular/http';
import { environment } from '../../environments/environment';

export const Locations = {
  OAUTH_URL: environment.ABSOLUTE_API_URL + 'oauth/token',
  PERSON_URL: environment.API_URL + 'persons/',
  PERSON_UPDATE_URL: environment.API_URL + 'persons/put/',
  PERSON_DOCUMENT_URL: environment.API_URL + 'persondocuments/',
  BUSINESS_URL: environment.API_URL + 'businesses/',
  STATE_URL: environment.API_URL + 'states/',
  USER_URL: environment.API_URL + 'user/',
  INTERVIEW_URL: environment.API_URL + 'interviews/',
  ROLE_URL: environment.API_URL + 'roles/',
  SKILL_URL: environment.API_URL + 'skills/',
  ROLE_SKILL_URL: environment.API_URL + 'role/skill',
  TRAINING_URL: environment.API_URL + 'trainings/',
  INTERVIEW_DETAILS_URL: environment.API_URL + 'interview/',
  FEEDBACK_URL: environment.API_URL + 'feedback/',
  INTERVIEW_TEMPLATE_URL: environment.API_URL + 'interviewTemplates/',
  OPPORTUNITY_URL: environment.API_URL + 'opportunities/',
  USERS_URL: environment.API_URL + 'users/',
  NEW_USER_URL: environment.API_URL + 'user/create/',
  USER_BY_PERSON_URL: environment.API_URL + 'user/person/',
  CHANGE_PASSWORD_URL: environment.API_URL + 'changepassword/',
  RESET_PASSWORD_URL: environment.ABSOLUTE_API_URL + 'api/resetpassword/',
};

export class RestResource {
  links?: Array<Link>;
  content?: Array<any>;
}

export class RestPageResource<T> {
  links?: Array<any>;
  content?: Array<T>;
  page?: {size: number, totalElements: number, totalPages: number, number: 0};
}

export class RestQuery {
  page?: number;
  size?: number;
  sort?: string;
}

export class Link {
  rel: string; 
  href: string;
}

export class UploadProgress {
  currentValue: number;
  maxValue: number;
  percentUploaded: number;
}

export class ErrorResponse {
  url: string; 
  description: string; 
  error: Response;

  constructor(url: string, description: string, error: Response) {
    this.url=url;
    this.description=description;
    this.error=error;
  }
}

/*
export class RestLocations {
  static PERSON_URL: string = 'http://localhost:8081/api/v1/persons/';
  static PERSON_UPDATE_URL: string = 'http://localhost:8081/api/v1/persons/put/';
  static PERSON_DOCUMENT_URL: string = 'http://localhost:8081/api/v1/persondocuments/';
  static BUSINESS_URL: string = 'http://localhost:8081/api/v1/businesses/';
}
*/
