import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBusinessType',
})
export class FilterBusinessTypePipe implements PipeTransform {

    transform(value: any, businessType): any {
        if (!value) {
            return [];
        }
        return value.filter(function(item){
            return item.businessType === businessType;
        });
    }
}
