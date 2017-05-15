import {Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter} from "@angular/core";
import {NotificationService} from "../../../services/notification.service";
import {TrainingService} from "../../../services/training.service";
import {Person, PersonTraining} from "../../../models/person.model";
import {Training, TrainingTask} from "../../../models/training.model";
import {RestService} from "../../../services/rest.service";
import {LoadingService} from "../../../services/loading.service";
import {PersonService} from "../../../services/person.service";

@Component({
  selector: 'app-person-trainings',
  templateUrl: './person-trainings.component.html',
  styleUrls: ['./person-trainings.component.css']
})
export class PersonTrainingsComponent implements OnInit {

  submitted: boolean = false;
  startDate: string;
  endDate: string;

  selectedTraining: Training = new Training();
  disabledAdd: boolean = true;
  trainings: Training[];

  exists: boolean = false;

  @Input()
  person: Person;

  offset = new Date().getTimezoneOffset() * 60 * 1000;

  @Output()
  persistPerson:EventEmitter<string> = new EventEmitter();

  save() {
    this.persistPerson.emit();
  }

  onSubmit() {

  }

  cancel() {
    this.submitted = false;
  }

  constructor(private notificationService: NotificationService,
              private loadingService: LoadingService,
              private personService: PersonService,
              private trainingService: TrainingService,
              private restService: RestService) {

  }

  ngOnInit() {
    this.getTrainings();
  }

  getTrainings() {
    this.trainingService.getTrainings()
      .subscribe(
        trainings => {
          console.log("Downloaded " + trainings.length + " trainings");
          this.trainings = trainings;
        },
        error => this.notificationService.notifyError(error)
      )
  }

  addTraining() {
    let personTraining = new PersonTraining();
    personTraining.training = this.selectedTraining;
    personTraining.startDate = Date.parse(this.startDate) + this.offset;
    personTraining.endDate = Date.parse(this.endDate) + this.offset;
    this.person.personTrainings.push(personTraining);
    this.disabledAdd = true;
    this.save();
  }

  removeTraining(index) {
    this.person.personTrainings.splice(index, 1);
    this.save();
  }

  onTaskCompletedChange(completed: boolean, task: TrainingTask, personTraining: PersonTraining): void {
    console.log(`Task[id=${task.id}] is ${completed ? '' : 'not '}completed`);
    if (completed) {
      personTraining.completedTasks.push(task);
    } else {
      personTraining.completedTasks.splice(personTraining.completedTasks.findIndex(completedTask => completedTask.id === task.id), 1);
    }
  }

  isTaskCompleted(personTraining: PersonTraining, task: TrainingTask): boolean {
    return personTraining.completedTasks.findIndex(completedTask => completedTask.id === task.id) > -1;
  }

}
