import { Pipe, PipeTransform } from '@angular/core';
import {ConstantService} from "../services/constant.service";

@Pipe({
  name: 'filterInterviewStatus'
})

export class FilterInterviewStatusPipe implements PipeTransform {

    constructor(private CONSTANTS: ConstantService) {
    }

    transform(value: any) {
        if (!value) {
            return [];
        }
        if (value === this.CONSTANTS.INTERVIEW_STATUS.IN_PROGRESS) {
            return 'In Progress';
        } else if (value === this.CONSTANTS.INTERVIEW_STATUS.COMPLETED) {
            return 'Completed';
        } else {
            return 'Open';
        }
    }
}
