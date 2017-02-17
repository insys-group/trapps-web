import { Response } from '@angular/http';
import { environment } from '../../environments/environment';

export const Locations = {
  PERSON_URL: environment.API_URL + 'persons/',
  PERSON_UPDATE_URL: environment.API_URL + 'persons/put/',
  PERSON_DOCUMENT_URL: environment.API_URL + 'persondocuments/',
  BUSINESS_URL: environment.API_URL + 'businesses/',
  STATE_URL: environment.API_URL + 'states/',
  INTERVIEW_URL: environment.API_URL + 'interviews/',
  INTERVIEW_DETAILS_URL: environment.API_URL + 'interview/',
  ROLE_URL: environment.API_URL + 'roles/',
  FEEDBACK_URL: environment.API_URL + 'feedback/'
}

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
