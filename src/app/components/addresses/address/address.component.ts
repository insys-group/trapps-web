import {Component, Input, OnInit} from '@angular/core';
import {Address} from '../../../models/address.model';
import 'rxjs/add/operator/take';
import {RestService} from '../../../services/rest.service';
import {NotificationService} from '../../../services/notification.service'
import {State} from '../../../models/state.model';
import {Locations} from "../../../models/rest.model";
import {Person} from "../../../models/person.model";

export const stateURL = Locations.STATE_URL + '?page=0&size=51';
//need to fix restService.getAll() to return all data and not just the first page

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
    console.log(`Enter: AddressComponent.set ${address}`);
    if (address) {
      this._address = address;
    } else {
      this._address = new Address();
    }
  }

  get address(): Address {
    return this._address;
  }

  constructor(private restService: RestService,
              private notificationService: NotificationService) {
    console.log('AddressComponent constructor');
  }

  ngOnInit(): void {
    console.log(`Enter: AddressComponent.ngOnInit()`);
    if (this._states.length === 0) {
      this.loadStates();
    }
  }

  private loadStates(): void {
    console.log(`Loading states data`);
    //this.restService.getAll<State>(environment.STATE_URL) see comment on stateURL above
    this.restService.getAll<State>(stateURL)
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