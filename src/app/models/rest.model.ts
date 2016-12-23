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

export class RestLocations {
  static PERSON_URL: string = 'http://localhost:8081/api/v1/persons/';
  static PERSON_UPDATE_URL: string = 'http://localhost:8081/api/v1/persons/put/';
  static PERSON_DOCUMENT_URL: string = 'http://localhost:8081/api/v1/persondocuments/';
  static BUSINESS_URL: string = 'http://localhost:8081/api/v1/businesses/';
}

