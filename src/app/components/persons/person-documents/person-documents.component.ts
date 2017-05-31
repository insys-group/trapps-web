import {Component, Input, OnInit, OnChanges, ViewChild, Output, EventEmitter} from '@angular/core';
import {Person, PersonDocument} from '../../../models/person.model';
import {UploadProgress, Locations} from '../../../models/rest.model';
import {RestService} from '../../../services/rest.service';
import {NotificationService} from '../../../services/notification.service';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/observable/merge';
import {environment} from '../../../../environments/environment';
import {ConfirmService} from "../../../services/confirm.service";
import {LoadingService} from "../../../services/loading.service";
import {PersonService} from "../../../services/person.service";
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-person-documents',
  templateUrl: './person-documents.component.html',
  styleUrls: ['./person-documents.component.css']
})

export class PersonDocumentsComponent implements OnInit {
  @ViewChild('fileInput') fileInput;

  constructor(private loadingService: LoadingService,
              private personService: PersonService,
              private confirmService: ConfirmService,
              private notificationService: NotificationService) {
  }

  @Input()
  person: Person;

  @Output()
  persistPerson: EventEmitter<string> = new EventEmitter();

  currentValue: number = 0;
  maxValue: number = 100;
  percentUploaded: string = '0%';
  progressHidden: boolean = true;
  file: any = {name: ''};
  documentName: string;

  ngOnInit() {

  }

  selectFile(): void {
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      this.file = fi.files[0];
    }
  }

  uploadFile() {

    let self = this;
    let fileExists = false;
    this.person.personDocuments.forEach(function (personDocument) {
      if (self.file.name == personDocument.fileName) {
        fileExists = true;
      }
    });

    if (fileExists) {
      this.notificationService.error('File with that name \'' + self.file.name + '\' already exists, please rename or remove first.')
    } else {
      let fi = this.fileInput.nativeElement;
      if (fi.files && fi.files[0]) {
        this.file = fi.files[0];
        console.log(`File to be uploaded is ${this.file.name}`);
        this.startUpload();

        this.personService.uploadFile(this.person.id, this.file)
          .subscribe(
            data => {
              if (data instanceof UploadProgress) {
                this.currentValue = data.currentValue;
                this.maxValue = data.maxValue;
                this.percentUploaded = `${data.percentUploaded}%`;
              } else {
                this.persistPerson.emit();
                this.notificationService.success('Document successfuly uploaded.');
              }
            },
            error => {
              this.stopUpload();
              this.notificationService.notifyError(error);
            },
            () => {
              console.log('File has been saved successfully');
              setTimeout(() => {
                this.stopUpload();
              }, 1000);
            }
          );

      } else {
        this.notificationService.info('No file selected');
      }
    }

  }

  deleteFile(personDocument: PersonDocument): void {
    let self = this;
    this.confirmService.confirm(
      'Confirm',
      'Are you sure you want to remove ' + personDocument.fileName + '?',
      function () {

        self.loadingService.show();
        self.personService.deleteFile(self.person.id, personDocument.id)
          .subscribe(
            deleted => {
              self.loadingService.hide();
              if (deleted) {
                self.notificationService.success('Document successfuly deleted.');
                self.persistPerson.emit();
              } else {
                self.notificationService.error('Error deleting the document.');
              }
            },
            error => {
              self.loadingService.hide();
              self.notificationService.notifyError(error);
            }
          );

      }
    );
  }

  startUpload(): void {
    this.progressHidden = false;
  }

  stopUpload(): void {
    this.progressHidden = true;
    this.file = {name: ''};
  }

  download(personDocument: PersonDocument) {
    this.loadingService.show();

    let reader = new FileReader();

    this.personService.downloadFile(personDocument.id)
      .subscribe(
        blob => {
          this.loadingService.hide();
          FileSaver.saveAs(blob, personDocument.fileName);
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error);
        }
      );

    reader.onloadend = function (e) {
      window.open(reader.result);
    }

  }

}