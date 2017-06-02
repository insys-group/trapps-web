import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {environment} from 'environments/environment';
import {LocalStorageService} from "./services/local.storage.service";
import {AuthService} from "./services/auth.service";
import {LoadingService} from "./services/loading.service";
import {AlertService, AlertMessage} from "./services/alert.service";
import {IntervalObservable} from "rxjs/observable/IntervalObservable";
import {ConstantService} from "./services/constant.service";
import {NotificationService} from "./services/notification.service";
import {Subscription} from "rxjs";
import {AuthToken} from "./models/login.model";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

    title = 'Trapps';
    environment = environment;
    userLoggedIn = LocalStorageService.get('user_info');
    authToken: AuthToken = LocalStorageService.get('auth_token');

    objAlert: AlertMessage;

    notifications: any;
    subscription: Subscription;

    constructor(private router: Router,
                private authService: AuthService,
                private loadingService: LoadingService,
                private alertService: AlertService,
                private CONSTANTS: ConstantService,
                private notificationService: NotificationService) {

        this.subscription = this.notificationService.getMessage().subscribe(notifications => {
            this.notifications = notifications;
        });

        if (LocalStorageService.get('notifications')) {
            this.notifications = LocalStorageService.get('notifications');
        } else {
            this.notifications = [];
        }

    }

    public alertOptions = {
        position: ["bottom", "right"],
        timeOut: 5000,
        lastOnBottom: false,
    };

    private refreshToken(): void {
        this.authToken = LocalStorageService.get('auth_token');
        if (this.authToken) {
            this.authService.refreshToken()
                .subscribe(
                    token => {
                        this.loadingService.hide();
                    },
                    error => {
                        this.loadingService.hide();
                        this.notificationService.notifyError(error)
                    }
                );
        }
    }

    ngOnInit(): void {
        this.alertService.alertStatus.subscribe((val: AlertMessage) => {
            this.objAlert = {show: val.show, message: val.message, type: val.type};
        });

        if (this.authToken) {
            if (this.authToken.local_expires_date > new Date(Date.now() - 100)) {
                this.refreshToken();
            } else {
                this.logout();
            }
        }
        IntervalObservable.create(this.CONSTANTS.TOKEN_REFRESH_INTERVAL).subscribe(n => {
            this.refreshToken();
        });
        console.log(this.userLoggedIn);
    }

    logout(): void {
        this.authService.logout();
    }

    onCloseAlert(reason: string) {
        let objCloseAlert: AlertMessage = {show: false, message: '', type: ''};
        this.alertService.showAlert(false, null, null);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
