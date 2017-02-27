import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';
import {NotificationService} from '../../../services/notification.service'
import {PersontrainingService} from '../../../services/persontraining.service';
import {TrainingService} from "../../../services/training.service";
import {PersonService} from "../../../services/person.service";
import {Person, PersonTraining} from "../../../models/person.model";
import {Training} from "../../../models/training.model";

@Component({
    selector: 'app-person-trainings',
    templateUrl: './person-trainings.component.html',
    styleUrls: ['./person-trainings.component.css']
})
export class PersonTrainingsComponent implements OnInit, OnChanges {

    submitted: boolean = false;
    startDate: string;
    endDate: string;

    selectedTraining: Training = new Training();
    trainings: Training[];
    assignedTrainings: PersonTraining[] = [];

    exists: boolean = false;
    @Input()
    person: Person;

    onSubmit() {

    }

    cancel() {
        this.submitted = false;
    }

    constructor(private persontrainingService: PersontrainingService, private router: Router, private route: ActivatedRoute,
                private notificationService: NotificationService, private trainingService: TrainingService,
                private personService: PersonService) {

    }

    ngOnInit() {
        console.log("PersonTrainingComponent.ngOnInit() ");
        this.getTrainings();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.person.personTrainings.length > 0) {
            console.log(`Person has ${this.person.personTrainings.length} assign trainings`);
            this.person.personTrainings.forEach(personTraining => {
                let href = personTraining.links.find(link => link.rel === 'training').href;
                let id = href.substr(href.lastIndexOf('/') + 1);
                personTraining.training = this.trainings.find(training => training.id == parseInt(id));
                this.assignedTrainings.push(personTraining);
            });
        }
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
        personTraining.startDate = new Date(this.startDate).getDate();
        personTraining.endDate = new Date(this.endDate).getDate();
        console.log("Added selected training " + this.selectedTraining.name + " with start date " + personTraining.startDate
            + " and end date " + personTraining.endDate);
        this.person.personTrainings.push(personTraining);
        this.assignedTrainings.push(personTraining);
        this.exists = false;

        console.log(`Updates person ${this.person.id} with trainings:`);
        this.person.personTrainings.forEach(personTraining =>
            console.log(`- ${personTraining.training.name}`)
        );

        this.persontrainingService.updatePerson(this.person).subscribe(
            person => person,
            error => this.notificationService.notifyError(error)
        );
    }

    removeTraining(personTraining: PersonTraining) {
        console.log(`Removes training ${personTraining}`);
        this.assignedTrainings.splice(this.assignedTrainings.indexOf(personTraining,0),1);
        this.persontrainingService.remove(personTraining, this.person).subscribe(
            person => person,
            error => this.notificationService.notifyError(error)
        );

    }

}
