import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterPersonType',
})
export class FilterPersonTypePipe implements PipeTransform {

    transform(value: any, personType: any, persons: any) {
        if (!value) {
            return [];
        }

        return value.filter(function (item) {
            if (personType === 'All') {
                return item.persons === persons;
            }
            else {
                return item.personType === personType;
            }
        });
    }
}
