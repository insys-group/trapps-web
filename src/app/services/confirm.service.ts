import { Injectable } from '@angular/core';

declare var swal: any;

@Injectable()
export class ConfirmService {

  confirm(title: string, message: string, confirmFn) {
    swal({
      title: title,
      text: message,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    }).then(function() {
      confirmFn();
    }, function(dismiss) {})
  }

}