import {Injectable, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotificationDialogComponent} from '../components/dialogs/notification-dialog/notification-dialog.component';
import {ErrorDialogComponent} from '../components/dialogs/error-dialog/error-dialog.component';
import {Observable} from 'rxjs/Observable';
import {ErrorResponse} from '../models/rest.model'
import {AlertService} from "./alert.service";
import {NotificationsService} from "angular2-notifications/dist";
import {Observer, Subject} from "rxjs";
import {LocalStorageService} from "./local.storage.service";

@Injectable()
export class NotificationService {

  private notifStack;
  private notifications = new Subject<any>();

  constructor(private modalService: NgbModal,
              private alertService: AlertService,
              private notificationsService: NotificationsService) {
    if(LocalStorageService.get('notifications')){
      this.notifStack = LocalStorageService.get('notifications');
    }else {
      this.notifStack = [];
    }
  }

  private pushNotif(classs, message){
    // this.notifStack.push({class: classs, message: message});
    this.notifStack.splice(0, 0, {class: classs, message: message});
    LocalStorageService.set('notifications', this.notifStack);
    this.notifications.next(this.notifStack);
  }

  info(message: string): void {
    this.alertService.showAlert(true, message, 'info');
    this.notificationsService.info('Info', message);
    this.pushNotif('notification-info', message);
  }

  success(message: string): void {
    this.alertService.showAlert(true, message, 'success');
    this.notificationsService.success('Success', message);
    this.pushNotif('notification-success', message);
  }

  error(message: string): void {
    this.alertService.showAlert(true, message, 'error');
    this.notificationsService.error('Error', message);
    this.pushNotif('notification-error', message);
  }

  notifyError(error: any): void {
    this.error(error.error);
  }

  getMessage(): Observable<any> {
    return this.notifications.asObservable();
  }

}
