import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NotificationService} from '../../../services/notification.service';
import {RestService} from '../../../services/rest.service';
import {Locations} from '../../../models/rest.model';
import {Training, Trainee} from '../../../models/training.model';
import {Person} from "../../../models/person.model";
import {find} from "rxjs/operator/find";

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
    persons: Array<Person>;

    ngOnInit() {
        console.log('Enter: TrainingListComponent.ngOnInit()');
        this.restService.getAll<Training>(Locations.TRAINING_URL).subscribe(
            trainings => {
                this.trainings = trainings;
                this.trainings.forEach(training => this.expandedRows.push(false));
                this.restService.getAll<Person>(Locations.PERSON_URL).subscribe(
                    persons => {
                        let trainingIds = this.trainings.map(training => training.id);
                        this.persons = persons;
                        persons.forEach(person => {
                            person.personTrainings.forEach(personTraining => {
                                let trainingId = this.getTrainingId(personTraining);
                                if (trainingIds.indexOf(trainingId) > -1) {
                                    let training = this.trainings.find(training => training.id == trainingId);
                                    let trainee = this.initTrainee(person, personTraining, training);
                                    if (training.trainees == null) {
                                        training.trainees = [];
                                    }
                                    training.trainees.push(trainee);
                                }
                            });
                        });
                        this.trainings.forEach(training => {
                            console.log(`Training : ${training.name}`);
                            if (training.trainees == null) {
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


    private getTrainingId(personTraining): number {
        let href = personTraining.links.find(link => link.rel === 'training').href;
        let id = href.substr(href.lastIndexOf('/') + 1);
        return Number(id);
    }

    private initTrainee(person, personTraining, training) {
        let trainee: Trainee = new Trainee();
        trainee.id = person.id;
        trainee.name = person.firstName + " " + person.lastName;
        let tasksCount = training.tasks.length;
        trainee.hided = personTraining.hided;
        trainee.progress = tasksCount > 0 ? Math.round((personTraining.completedTasks.length / tasksCount) * 100) : 0;
        return trainee;
    }

    hideTrainee(trainee: Trainee, training: Training) {
        trainee.hided = true;
        let personIndex = this.persons.findIndex(person => person.id == trainee.id);
        if (personIndex >-1){
            let person = this.persons[personIndex];
            console.log(`Hide trainee person ${person.firstName} ${person.lastName}`);
            console.log(`Hide trainee traininig ${training.id}`);
            console.log(`Hide trainee trainee ${trainee.name}`);
            person.personTrainings.find(personTraining => this.getTrainingId(personTraining) == training.id).hided = true;
            this.restService.put<Person>(Locations.PERSON_UPDATE_URL+person.id, person)
                .subscribe(
                    () => {},
                    error => this.notificationService.notifyError(error)
                );
        }
    }
}
