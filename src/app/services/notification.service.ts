import { Injectable, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NotificationDialogComponent } from '../components/dialogs/notification-dialog/notification-dialog.component';
import { ErrorDialogComponent } from '../components/dialogs/error-dialog/error-dialog.component';
import { Observable } from 'rxjs/Observable';
import { ErrorResponse } from '../models/rest.model'
import {AlertService} from "./alert.service";

@Injectable()
export class NotificationService {

    constructor(private modalService: NgbModal, private alertService: AlertService) {}

    ask(message: string, buttons: Array<string>): Observable<any> {
        return Observable.create(observer => {
            const modalRef = this.modalService.open(NotificationDialogComponent);
            modalRef.componentInstance.data = {
                body: message,
                buttons: buttons,
                'messageClass': 'text-warning',
                'titleClass': 'text-danger'};
            modalRef.result.then(
                result => {
                    console.log('Returned is ' + result);
                    observer.next(result)
                },
                reason => null
            );
        });
    }

    info(message: string): void {
        this.alertService.showAlert(true, message, 'info');
    }

    success(message: string): void {
        this.alertService.showAlert(true, message, 'success');
    }

    error(message: string): void {
        this.alertService.showAlert(true, message, 'error');
    }
    
    notifyError(error: any): void {
        console.log(`This is error object *********** ${JSON.stringify(error.error)}`);
        this.error(JSON.stringify(error.error));
    }
}
