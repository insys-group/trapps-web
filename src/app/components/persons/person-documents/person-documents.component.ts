import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Person, PersonDocument } from '../../../models/person.model';
import { UploadProgress } from '../../../models/rest.model';
import { RestService } from '../../../services/rest.service';
import { NotificationService } from '../../../services/notification.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/merge';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-person-documents',
  templateUrl: './person-documents.component.html',
  styleUrls: ['./person-documents.component.css']
})

export class PersonDocumentsComponent implements OnInit {
  @ViewChild('fileInput') fileInput;

  constructor(private restService: RestService, private notificationService: NotificationService) { }
  @Input()
  person: Person;

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
    console.log('Enter: uploadFile');
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      this.file = fi.files[0];
      console.log(`File to be uploaded is ${this.file.name}`);
      this.startUpload();
      this.restService.uploadFile<PersonDocument>(`${environment.PERSON_DOCUMENT_URL}${this.person.id}/documents`, this.file)
      .subscribe (
        data => {
          if(data instanceof UploadProgress) {
            this.currentValue=data.currentValue; this.maxValue=data.maxValue; this.percentUploaded=`${data.percentUploaded}%`;
          } else {
            data.downloadLink=`${environment.PERSON_DOCUMENT_URL}${this.person.id}/${data.id}`;
            let index=this.person.personDocuments.findIndex(d => d.fileName===data.fileName);
            if(index>-1) {
              this.person.personDocuments[index]=data;
            } else {
              this.person.personDocuments.push(data);
            }
            console.log('Person Document added is ' + JSON.stringify(this.person.personDocuments));
          }
        },
        error => {
          this.handleError; this.stopUpload();},
        () => {
          console.log('File has been saved successfully');
          setTimeout(()=>{
            this.stopUpload();
          }, 1000);
        }
      );
    } else {
      this.notificationService.info('Please the file first');
    }
  }

  deleteFile(document: PersonDocument): void {
    this.restService.deleteFile<PersonDocument>(`${environment.PERSON_DOCUMENT_URL}${this.person.id}/${document.id}`)
    .subscribe(
      (deletedDocument) => {
        let index=this.person.personDocuments.findIndex(d => d.fileName===deletedDocument.fileName);
        console.log('Deleted document returned ' + JSON.stringify(deletedDocument) + 'Index is ' + index);
        if(index>-1) {
          this.person.personDocuments.splice(index, 1);
          this.notificationService.info(`Document ${document.fileName} has been deleted successfully`);
        }
      },
      error => this.handleError
    );
  }

  startUpload():void {
    this.progressHidden=false;
  }

  stopUpload(): void {
    this.progressHidden=true; 
    this.file={name: ''};
  }

  private handleError(error: any): void {
    console.error('An error occurred', error);
    this.notificationService.error('Error occured: ' + error);
  }

}
