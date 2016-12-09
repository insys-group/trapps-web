import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBusinessType'
})

export class FilterBusinessTypePipe implements PipeTransform {
  transform(value: any, businessType: any, businesses: any) {
    if (!value) {
      return [];
    }

    return value.filter(function(item) {
      if (businessType === 'All') {
        return item.businesses === businesses;
      } else {
        return item.businessType === businessType;
      }
    });
  }
}
