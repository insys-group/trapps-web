import { Injectable, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NotificationDialogComponent } from '../components/dialogs/notification-dialog/notification-dialog.component';
import { Observable } from 'rxjs/Observable';

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

    error(message: string): void {
        const modalRef = this.modalService.open(NotificationDialogComponent);
        modalRef.componentInstance.data = {
            body: message,
            buttons: ['Close'],
            'messageClass': 'text-danger',
            'titleClass': 'text-primary'};
        modalRef.result.then(result => null,reason => null);
    }
}
