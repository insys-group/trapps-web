import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Locations } from '../../../models/rest.model';
import { RestService } from '../../../services/rest.service';
import { NotificationService } from '../../../services/notification.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Training, ProgressType, TrainingTask } from '../../../models/training.model'
import { Address } from '../../../models/address.model';
import { AddressComponent } from '../../addresses/address/address.component';
import { Observable } from 'rxjs/Observable';
import { AfterViewInit, AfterViewChecked, ViewChildren, ViewChild, ContentChildren, ContentChild } from '@angular/core';

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

  constructor(
    private restService: RestService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private notificationService: NotificationService
  ) { }

  @ViewChild(AddressComponent)
  addressComponent: AddressComponent;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id == this.idOfNewTraining) {
        this.setProgress(ProgressType.NOT_STARTED);
        this.training.online = true;
        this.training.tasks = [];
      } else {
        this.loadTraining().subscribe(
          training => {
            this.training = training;
            console.log(`Received training ${JSON.stringify(this.training)}`);
          },
          error => { this.notificationService.error(error) }
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
    if (this.id == this.idOfNewTraining) {
      this.restService.create<Training>(Locations.TRAINING_URL, this.training)
        .subscribe(
        training => {
          this.training = training;
          this.router.navigate(['/trainings']);
        },
        error => this.notificationService.notifyError(error)
        )
    } else {
      this.restService.update<Training>(this.training)
        .subscribe(
        () => this.router.navigate(['/trainings']),
        error => this.notificationService.notifyError(error)
        )
    }

  }

  delete(): void {
    console.log('Enter: TrainingComponent.delete()');
    this.notificationService.ask(`Do you really want to delete ${this.training.name}?`, ["Yes", "No"])
      .subscribe(
      result => {
        if (result === 'Yes') {
          this.restService.delete(this.training).subscribe(
            () => this.router.navigate(['/trainings']),
            error => this.notificationService.notifyError(error)
          )
        } else {
          console.log('Deletion was cancelled');
        }
      },
      () => null
      );
  }

  cancel(): void {
    this.location.back();
  }

  setProgress(progress: ProgressType): void {
    console.log(`Progress type set to ${progress}`)
    // this.training.progress = progress;
  }

  isOnlineChange(state: boolean): void {
    console.log(`Training is online: ${state}`)
    this.training.online = state;
  }

  // onTaskCompletedChange(state: boolean, task: TrainingTask): void {
  //   console.log(`Task ${JSON.stringify(task)} completed: ${state}`);
  //   task.completed = state;
  // }

  onWeblinkChange(link: string, task: TrainingTask) {
    console.log(`Task ${JSON.stringify(task)} link: ${link}`);
  }

  onTaskChange(name: string, task: TrainingTask) {
    console.log(`Task ${JSON.stringify(task)} name: ${name}`);
  }

  addTask() {
    var task: TrainingTask = new TrainingTask();
    task.name = this.currentTask.name;
    task.description = this.currentTask.description;
    task.weblink = this.currentTask.weblink;
    this.training.tasks.push(task);
    this.currentTask.name = "";
    this.currentTask.description = "";
    this.currentTask.weblink = "";
  }

}
