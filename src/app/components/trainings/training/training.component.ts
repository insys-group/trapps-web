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
import {TrainingService} from "../../../services/training.service";

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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private trainingService: TrainingService,
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
          this.loadingService.show();
          this.trainingService.getTraining(this.id).subscribe(
            training => {
              this.loadingService.hide();
              this.training = training;
              console.log(this.training);
            },
            error => {
              this.loadingService.hide();
              this.notificationService.error(error)
            }
          )
        }
      }
    )
  }

  save(): void {
    if (this.training.online) {
      this.training.location = null;
    }
    this.loadingService.show();
    this.trainingService.save(this.training)
      .subscribe(
        training => {
          this.loadingService.hide();
          this.training = training;
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error)
        }
      )
  }

  cancel(): void {
    this.location.back();
  }

  isOnlineChange(state: boolean): void {
    this.training.online = state;
  }

  addTask() {
    let task: TrainingTask = new TrainingTask();
    task.name = this.currentTask.name;
    task.description = this.currentTask.description;
    task.weblink = this.currentTask.weblink;
    this.training.tasks.push(task);
    this.currentTask.name = "";
    this.currentTask.description = "";
    this.currentTask.weblink = "";
    this.save();
  }

  removeTask(task: TrainingTask) {
    let self = this;
    this.confirmService.confirm(
      `Do you really want to delete this task?`,
      '',
      function () {
        self.training.tasks.splice(self.training.tasks.indexOf(task, 0), 1);
        self.save();
      }
    );
  }


}
