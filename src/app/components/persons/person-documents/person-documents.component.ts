import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Person, PersonDocument } from '../../../models/person.model';
import { RestLocations } from '../../../models/rest.model';
import { RestService } from '../../../services/rest.service';
import { NotificationService } from '../../../services/notification.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/merge';

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
  fileName: string;
  documentName: string;

  ngOnInit() {
  }

  uploadFile() {
    console.log('Enter: uploadFile');
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      let file = fi.files[0];
      console.log(`File to be uploaded is ${file}`);
      this.fileName=file.name;
      this.restService.upload(`${RestLocations.PERSON_DOCUMENT_URL}${this.person.id}/${file.name}`, file)
      .subscribe(
        progress => {
          this.progressHidden=false;
          this.currentValue=progress.currentValue; this.maxValue=progress.maxValue; this.percentUploaded=progress.percentUploaded;
        },
        error => {this.handleError; this.progressHidden=true;},
        () => {
          console.log('File has been saved successfully');
          setTimeout(()=>{this.progressHidden=true;}, 5000);
        }
      );
    }
  }

  private handleError(error: any): void {
    console.error('An error occurred', error);
    this.notificationService.error('An Error occured ' + error);
  }

}
