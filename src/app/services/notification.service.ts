import { Injectable, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NotificationDialogComponent } from '../components/dialogs/notification-dialog/notification-dialog.component';
import { ErrorDialogComponent } from '../components/dialogs/error-dialog/error-dialog.component';
import { Observable } from 'rxjs/Observable';
import { ErrorResponse } from '../models/rest.model'

@Injectable()
export class NotificationService {
    constructor(private modalService: NgbModal) {}

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
        const modalRef = this.modalService.open(NotificationDialogComponent);
        modalRef.componentInstance.data = {
            body: message,
            buttons: ['Close'],
            'messageClass': 'text-success',
            'titleClass': 'text-primary'};
        modalRef.result.then(result => null,reason => null);
    }
    
    //@Deprecated
    error(message: string): void {
        const modalRef = this.modalService.open(NotificationDialogComponent);
        modalRef.componentInstance.data = {
            body: message,
            buttons: ['Close'],
            'messageClass': 'text-danger',
            'titleClass': 'text-primary'};
        modalRef.result.then(result => null,reason => null);
    }
    
    notifyError(error: any): void {
        console.log(`This is error object *********** ${JSON.stringify(error.error)}`);
        const modalRef = this.modalService.open(ErrorDialogComponent);
        modalRef.componentInstance.data = {
            error: error,
            detail: JSON.stringify(error.error),
            status: error.error.status===0?'Network Error':error.error.status,
            buttons: ['Close'],
            'messageClass': 'text-danger',
            'titleClass': 'text-danger'};
        modalRef.result.then(result => null,reason => null);
    }
}
