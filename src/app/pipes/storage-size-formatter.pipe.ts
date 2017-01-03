import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'storageSizeFormatter'
})
export class StorageSizeFormatterPipe implements PipeTransform {
  transform(value: any, precision: number): string {
    if(value < 1024) {
      return `${value} Bytes`;
    } else if(value < (1024*1024)) {
      return `${this.round(value/1024, precision)} KB`;
    } else if(value < (1024*1024*1024)) {
      return `${this.round(value/1024/1024, precision)} MB`;
    }
    return 'invalid size';
  }

  private round(value: number, precision: number): number {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

}
