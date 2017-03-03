import {Component, OnInit, Input, OnChanges, SimpleChanges} from "@angular/core";
import {NotificationService} from "../../../services/notification.service";
import {TrainingService} from "../../../services/training.service";
import {Person, PersonTraining} from "../../../models/person.model";
import {Training, TrainingTask} from "../../../models/training.model";
import {RestService} from "../../../services/rest.service";

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
    disabledAdd: boolean = true;
    trainings: Training[];
    assignedTrainings: PersonTraining[] = [];

    exists: boolean = false;
    @Input()
    person: Person;

    offset = new Date().getTimezoneOffset() * 60 * 1000;

    onSubmit() {

    }

    cancel() {
        this.submitted = false;
    }

    constructor(private notificationService: NotificationService,
                private trainingService: TrainingService, private restService: RestService) {

    }

    ngOnInit() {
        console.log("PersonTrainingComponent.ngOnInit() ");
        this.getTrainings();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.person.personTrainings.length > 0) {
            console.log(`Person has ${this.person.personTrainings.length} assign trainings`);
            this.person.personTrainings.forEach(personTraining => {
                let id = this.getTrainingId(personTraining);
                personTraining.training = this.trainings.find(training => training.id == parseInt(id));
                this.assignedTrainings.push(personTraining);
            });
        }
    }

    private getTrainingId(personTraining) {
        let href = personTraining.links.find(link => link.rel === 'training').href;
        return href.substr(href.lastIndexOf('/') + 1);
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
        console.log("Added selected training " + this.selectedTraining.name + " with start date " + personTraining.startDate
            + " and end date " + personTraining.endDate);
        this.person.personTrainings.push(personTraining);
        this.assignedTrainings.push(personTraining);
        this.disabledAdd = true;

        // this.persontrainingService.updatePerson(this.person).subscribe(
        //     person => person,
        //     error => this.notificationService.notifyError(error)
        // );
        // this.restService.getOne<Person>(`${Locations.PERSON_URL}${this.person.id}`)
        //     .subscribe(
        //         savedPerson => {
        //              let savedPersonTraining = savedPerson.personTrainings.find(savedPersonTraining=>savedPersonTraining.training.name==personTraining.training.name);
        //             personTraining.id = savedPersonTraining.id;
        //         },
        //         error => this.notificationService.notifyError(error)
        //     );
    }

    removeTraining(personTraining: PersonTraining) {
        console.log(`Removes training ${personTraining.training.name}`);
        this.assignedTrainings.splice(this.assignedTrainings.indexOf(personTraining, 0), 1);
        console.log(`Assigned training length ${this.assignedTrainings.length}`);
        this.person.personTrainings.splice(this.person.personTrainings.findIndex(pTraining => pTraining.training.name==personTraining.training.name), 1);
        console.log(`Person training length ${this.person.personTrainings.length}`);
        // this.persontrainingService.remove(personTraining, this.person).subscribe(
        //     person => person,
        //     error => this.notificationService.notifyError(error)
        // );
    }

    onTaskCompletedChange(completed: boolean, task: TrainingTask, personTraining: PersonTraining): void {
        console.log(`Task[id=${task.id}] is ${completed ? '' : 'not '}completed`);
        if (completed) {
            personTraining.completedTasks.push(task);
        } else {
            personTraining.completedTasks.splice(personTraining.completedTasks.findIndex(completedTask => completedTask.id === task.id), 1);
        }
        // this.persontrainingService.updatePerson(this.person).subscribe(
        //     person => person,
        //     error => this.notificationService.notifyError(error)
        // );

    }

    isTaskCompleted(personTraining: PersonTraining, task: TrainingTask): boolean {
        return personTraining.completedTasks.findIndex(completedTask => completedTask.id === task.id) > -1;
    }

    checkAddButtonDisabled(): boolean {
        return this.assignedTrainings.findIndex(assignedTraining => assignedTraining.training == this.selectedTraining) > -1;
    }

}
