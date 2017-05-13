import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NotificationService} from '../../../services/notification.service';
import {Training, Trainee} from '../../../models/training.model';
import {Person} from "../../../models/person.model";
import {LoadingService} from "../../../services/loading.service";
import {TrainingService} from "../../../services/training.service";
import {PersonService} from "../../../services/person.service";
import {ConfirmService} from "../../../services/confirm.service";

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.css']
})
export class TrainingListComponent implements OnInit {

  constructor(private router: Router,
              private trainingService: TrainingService,
              private personService: PersonService,
              private loadingService: LoadingService,
              private confirmService: ConfirmService,
              private notificationService: NotificationService) {
  }

  trainings: Array<Training>;
  expandedRows: Array<boolean> = [];
  persons: Array<Person>;

  ngOnInit() {
    this.loadingService.show();
    this.trainingService.getTrainings().subscribe(
      trainings => {
        this.loadingService.hide();
        if(trainings[0] && trainings[0].id){
          this.trainings = trainings;
        }
      },
      error => {
        this.loadingService.hide();
        this.notificationService.notifyError(error)
      }
    );
  }

  onSelect(training: Training) {
    this.router.navigate(['/trainings', training.id]);
  }

  create() {
    this.router.navigate(['/trainings', 0])
  }

  remove(training): void {
    let self = this;
    this.confirmService.confirm(
      `Do you really want to delete the training?`,
      '',
      function () {
        self.loadingService.show();
        self.trainingService.remove(training)
          .subscribe(() => {
              self.loadingService.hide();
          self.router.navigate(['/trainings'])
        },
          error => {
            self.loadingService.hide();
          self.notificationService.notifyError(error)
        }
        );
      }
    );
  }

}
