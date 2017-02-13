import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
import { RestService } from '../../../services/rest.service';
import { Locations } from '../../../models/rest.model';
import { Training } from '../../../models/training.model';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.css']
})
export class TrainingListComponent implements OnInit {

  constructor(private router: Router, private restService: RestService, private notificationService: NotificationService) { }

  trainings: Array<Training>;

  ngOnInit() {
    console.log('Enter: TrainingListComponent.ngOnInit()');
    this.restService.getAll<Training>(Locations.TRAINING_URL).subscribe(
      trainings => this.trainings = trainings,
      error => this.notificationService.notifyError(error)
    )
  }

  onSelect(training: Training) {
    this.router.navigate(['/trainings', training.id]);
  }

  create() {
    this.router.navigate(['/trainings', 0])
  }

}
