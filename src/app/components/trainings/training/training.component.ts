import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Locations} from '../../../models/rest.model';
import {RestService} from '../../../services/rest.service';
import {NotificationService} from '../../../services/notification.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Training, TrainingTask} from '../../../models/training.model'
import {Address} from '../../../models/address.model';
import {AddressComponent} from '../../addresses/address/address.component';
import {Observable} from 'rxjs/Observable';
import {AfterViewInit, AfterViewChecked, ViewChildren, ViewChild, ContentChildren, ContentChild} from '@angular/core';
import {ConfirmService} from "../../../services/confirm.service";
import {LoadingService} from "../../../services/loading.service";

@Component({
    selector: 'app-training',
    templateUrl: './training.component.html',
    styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

    readonly idOfNewTraining: number = 0;

    id: number;
    training: Training = new Training();
    currentTask: TrainingTask = new TrainingTask();

    constructor(private restService: RestService,
                private router: Router,
                private route: ActivatedRoute,
                private location: Location,
                private loadingService: LoadingService,
                private notificationService: NotificationService,
                private confirmService: ConfirmService) {
    }

    @ViewChild(AddressComponent)
    addressComponent: AddressComponent;

    ngOnInit() {
        this.route.params.subscribe(params => {
                this.id = params['id'];
                if (this.id == this.idOfNewTraining) {
                    this.training.online = true;
                    this.training.tasks = [];
                } else {
                    this.loadTraining().subscribe(
                        training => {
                            this.training = training;
                            console.log(`Received training ${JSON.stringify(this.training)}`);
                        },
                        error => {
                            this.notificationService.error(error)
                        }
                    )
                }
            }
        )
    }

    loadTraining(): Observable<Training> {
        return this.restService.getOne<Training>(`${Locations.TRAINING_URL}${this.id}`)
            .do(training => {
                },
                error => this.notificationService.notifyError(error)
            );
    }

    save(): void {
        console.log(`Enter: TrainingComponent save() ${JSON.stringify(this.training)}`);
        if (this.training.online) {
            this.training.location = null;
        }
        this.restService.create<Training>(Locations.TRAINING_URL, this.training)
            .subscribe(
                training => {
                    this.training = training;
                    this.router.navigate(['/trainings']);
                },
                error => this.notificationService.notifyError(error)
            )

    }

    delete(): void {
        let self = this;
        this.confirmService.confirm(
          `Do you really want to delete ${this.training.name}?`,
          '',
          function () {
              self.restService.delete(self.training).subscribe(
                () => self.router.navigate(['/trainings']),
                error => self.notificationService.notifyError(error)
              );
          }
        );
    }

    cancel(): void {
        this.location.back();
    }


    isOnlineChange(state: boolean): void {
        console.log(`Training is online: ${state}`)
        this.training.online = state;
    }

    addTask() {
        console.log(`Added task ${this.currentTask.name}`);
        let task: TrainingTask = new TrainingTask();
        task.name = this.currentTask.name;
        task.description = this.currentTask.description;
        task.weblink = this.currentTask.weblink;
        this.training.tasks.push(task);
        this.currentTask.name = "";
        this.currentTask.description = "";
        this.currentTask.weblink = "";
    }

    removeTask(task: TrainingTask){
        console.log(`Remove task ${task.id}`);
        this.training.tasks.splice(this.training.tasks.indexOf(task,0),1);
    }



}
