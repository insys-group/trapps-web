import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPersonType',
})
export class FilterPersonTypePipe implements PipeTransform {

    transform(value: any, personType): any {
        if (!value) {
            return [];
        }
        return value.filter(function(item){
            return item.personType === personType;
        });
    }
}
