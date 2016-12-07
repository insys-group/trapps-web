import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPersonType'
})
export class FilterPersonTypePipe implements PipeTransform {

    transform(value: any, [personType]): any {
        return value.filter((item) => item.personType === personType);
    }
}
