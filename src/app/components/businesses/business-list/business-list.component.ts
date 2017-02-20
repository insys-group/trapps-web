import {Component, OnInit, EventEmitter} from "@angular/core";
import {BusinessService} from "../../../services/business.service";
import {Business, BusinessType} from "../../../models/business.model";
import {Router} from "@angular/router";
import {NotificationService} from "../../../services/notification.service";
//import {IResource} from "../../../resources/crud.resource";
import {ConstantService} from "../../../services/constant.service";

@Component({
    selector: 'app-business-list',
    templateUrl: './business-list.component.html',
    styleUrls: ['./business-list.component.css']
})

export class BusinessListComponent implements OnInit {
    closeResult: string;
    errorMessage: string;
    businesses
    businessTypes: string[] = [BusinessType.ALL, BusinessType.CLIENT, BusinessType.PLABS,
        BusinessType.PIVOTAL, BusinessType.VENDOR, BusinessType.INSYS]
    businessType: string = BusinessType.ALL;

    select = new EventEmitter();

    constructor(private router: Router,
                private businessService: BusinessService,
                private notificationService: NotificationService,
                private constantService: ConstantService) {
    }

    ngOnInit() {
        console.log('Enter: BusinessListComponent.ngOnInit()');
        this.businessService.getAll().subscribe(
            businesses => {
                //this.businesses.forEach(business => console.log(`Business is ${JSON.stringify(business)}`));
                this.businesses = businesses ;
            },
            //error => this.notificationService.error(error.json().error) Why doesn't this print a stacktrace??
            error => this.notificationService.error('An Error occured retrieving from backend. ' + error)
        );
        this.select.emit(this.businessTypes[0]);
    }


    onSelect(business: Business) {
        this.router.navigate(['/businesses', business.id]);
    }

    create() {
        this.router.navigate(['/businesses', 0, {businessType: this.businessType}]);
    }

    createNewBusiness() {
        console.log('will call new component');
    }

    private handleError(error: any): void {
        console.error('An error occurred', error);
        this.notificationService.error('An Error occured ' + error);
    }

}