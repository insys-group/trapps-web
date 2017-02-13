import { RestResource } from '../rest.model';

export class Question extends RestResource {
  id: number;
  question: string;
  answer: string;
  comment: string;
  quality: QualityType;
}

export class QualityType {
  static DNK: string = "Does Not Know";
  static POOR: string = "Poor";
  static ACCEPTABLE: string = "Acceptable";
  static GOOD: string = "Good";
  static EXCELLENT: string = "Excellent";
}
