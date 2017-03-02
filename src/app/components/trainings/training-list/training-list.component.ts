import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NotificationService} from '../../../services/notification.service';
import {RestService} from '../../../services/rest.service';
import {Locations} from '../../../models/rest.model';
import {Training, Trainee} from '../../../models/training.model';
import {Person} from "../../../models/person.model";

@Component({
    selector: 'app-training-list',
    templateUrl: './training-list.component.html',
    styleUrls: ['./training-list.component.css']
})
export class TrainingListComponent implements OnInit {

    constructor(private router: Router, private restService: RestService, private notificationService: NotificationService) {
    }

    trainings: Array<Training>;
    expandedRows: Array<boolean> = [];

    ngOnInit() {
        console.log('Enter: TrainingListComponent.ngOnInit()');
        this.restService.getAll<Training>(Locations.TRAINING_URL).subscribe(
            trainings => {
                this.trainings = trainings;
                this.trainings.forEach(training => this.expandedRows.push(false));
                this.restService.getAll<Person>(Locations.PERSON_URL).subscribe(
                    persons => {
                        let trainingIds = this.trainings.map(training => training.id);
                        persons.forEach(person => {
                            person.personTrainings.forEach(personTraining => {
                                let trainingId = this.getTrainingId(personTraining);
                                if (trainingIds.indexOf(trainingId) > -1) {
                                    let training = this.trainings.find(training => training.id == trainingId);
                                    let trainee = this.initTrainee(person, personTraining, training);
                                    if (training.trainees == null){
                                        training.trainees = [];
                                    }
                                    training.trainees.push(trainee);
                                }
                            });
                        });
                        this.trainings.forEach(training => {
                            console.log(`Training : ${training.name}`);
                            if (training.trainees == null){
                                training.trainees = [];
                            }
                            training.trainees.forEach(trainee => console.log(`- ${trainee.name} progress: ${trainee.progress}`));
                        })
                    },
                    error => this.notificationService.notifyError(error)
                )
            },
            error => this.notificationService.notifyError(error)
        );


    }

    onSelect(training: Training) {
        this.router.navigate(['/trainings', training.id]);
    }

    create() {
        this.router.navigate(['/trainings', 0])
    }


    private getTrainingId(personTraining):number {
        let href = personTraining.links.find(link => link.rel === 'training').href;
        let id = href.substr(href.lastIndexOf('/') + 1);
        return Number(id);
    }

    private initTrainee(person, personTraining, training) {
        let trainee: Trainee = new Trainee();
        trainee.name = person.firstName + " " + person.lastName;
        let tasksCount = training.tasks.length;
        trainee.progress = tasksCount > 0 ? Math.round((personTraining.completedTasks.length / tasksCount)*100) : 0;
        return trainee;
    }

    getProgressStyle(progress: number):string{
        return `width: ${progress}%;`;
    }
}
