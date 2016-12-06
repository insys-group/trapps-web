import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPersonType'
})
export class FilterPersonTypePipe implements PipeTransform {

    transform(value: any, [status]): any {
        return value.filter((item) => item.status === status);
    }
}
