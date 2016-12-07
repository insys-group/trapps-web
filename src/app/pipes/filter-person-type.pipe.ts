import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPersonType'
})
export class FilterPersonTypePipe implements PipeTransform {

    transform(value: any, [personType]): any {
            if (value==null) {
      return null;
    }
        return value.filter((item) => item.personType === personType);
    }
}
