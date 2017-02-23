import {Component, OnInit} from '@angular/core';
import {PersonTraining} from '../../../models/person.model';

import {Router, ActivatedRoute} from '@angular/router';
import {NotificationService} from '../../../services/notification.service'
import {PersontrainingService} from '../../../services/persontraining.service';
import {TrainingService} from "../../../services/training.service";
import {PersonService} from "../../../services/person.service";
import {PersonType, Person} from "../../../models/person.model";

@Component({
    selector: 'app-person-trainings',
    templateUrl: './person-trainings.component.html',
    styleUrls: ['./person-trainings.component.css']
})
export class PersonTrainingsComponent implements OnInit {

    submitted = false;
    personTraining = new PersonTraining();

    trainings;
    persons;

    personTrainingId: number
    newTrainee: Person;

    person: Person;

    onSubmit() {

    }

    cancel() {
        this.submitted = false;
        this.personTraining = new PersonTraining();
    }

    constructor(private persontrainingService: PersontrainingService, private router: Router, private route: ActivatedRoute,
                private notificationService: NotificationService, private trainingService: TrainingService,
                private personService: PersonService) {
        this.route.params.subscribe(params => {
            this.personTrainingId = +params['id'];
        });
    }

    ngOnInit(): void {
        this.getTrainings();
        this.getPersonTraining();
    }


    getPersonTraining() {
        if(this.personTrainingId){
            this.persontrainingService.getPersonTraining(this.personTrainingId)
                .subscribe(
                    personTraining => {

                        this.personTraining = personTraining;
                    },
                    error => this.notificationService.notifyError(error)
                );
        }
    }

    getTrainings() {
        this.trainingService.getTrainings()
            .subscribe(
                trainings => {
                    this.trainings = trainings;
                    this.autopopulateTrainings();
                },
                error => this.notificationService.notifyError(error)
            )
    }

    autopopulateTrainings() {
        if (this.trainings && this.personTraining.trainings) {
            this.trainings.forEach(training => {
                    this.personTraining.trainings.forEach(personTraining => {
                            if (training.id === personTraining.id) {
                                this.personTraining.trainings.push(personTraining)
                            }
                        }
                    )
                }
            )
        }
    }


}
