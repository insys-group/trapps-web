import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Address} from '../../../models/address.model';
import 'rxjs/add/operator/take';
import {RestService} from '../../../services/rest.service';
import {NotificationService} from '../../../services/notification.service'
import {State} from '../../../models/state.model';
import {Locations} from "../../../models/rest.model";
import {Person} from "../../../models/person.model";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})

export class AddressComponent implements OnInit {

  private _address: Address;
  private _states: Array<string> = [];

  @Input()
  set address(address: Address) {
    if(address){
      this._address = address;
    } else {
      this._address = new Address();
    }
  }

  get address(): Address {
    return this._address;
  }

  @Output()
  persistPerson:EventEmitter<Address> = new EventEmitter();

  save() {
    this.persistPerson.emit(this.address);
  }

  constructor(private restService: RestService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    if (this._states.length === 0) {
      this.loadStates();
    }
  }

  private loadStates(): void {
    console.log(`Loading states data`);
    this.restService.getAll<State>(Locations.STATE_URL)
      .subscribe(
        states => {
          this._states = states.map(state => state.stateCode);
        },
        error => this.handleError
      );
  }

  private handleError(error: any): void {
    console.error('An error occurred', error);
    this.notificationService.error('An Error occured ' + error);
  }
}