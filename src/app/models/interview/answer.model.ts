import { RestResource } from '../rest.model';
import {Interview} from "./interview.model";
import {Question} from "./question.model";

export class Answer extends RestResource {
  id: number;
  interview: Interview;
  question: Question = new Question();
  answer: string;
  rate: number;
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
