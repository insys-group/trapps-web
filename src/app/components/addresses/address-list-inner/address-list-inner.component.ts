import { Component, Input, OnInit } from '@angular/core';
import { Address } from '../../../models/address.model';
import { Link, Locations } from '../../../models/rest.model';
import { RestService } from '../../../services/rest.service';
import { NotificationService } from '../../../services/notification.service'
import { State } from '../../../models/state.model';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';

//need to fix restService.getAll() to return all data and not just the first page
@Component({
  selector: 'app-address-list-inner',
  templateUrl: './address-list-inner.component.html',
  styleUrls: ['./address-list-inner.component.css']
})

export class AddressListInnerComponent implements OnInit {
  stateURL: string='';
 private _addresses = new Array<Address>();
 private _states:Array<string>;
  set addresses(addresses: Address[]) {
    console.log(`Enter: AddressComponent.set ${addresses}`);
    this._addresses = addresses;
  }
  get addresses(): Address[] {
    return this._addresses;
  }

  constructor( 
    private restService: RestService,
    private notificationService: NotificationService
            ) 
        {
          console.log('AddressListComponent constructor');
           this.stateURL = Locations.STATE_URL + '?page=0&size=51';
        }

  ngOnInit() {
    console.log('ngOnInit() = ' + this.addresses);
     this.loadStates();
  }

  add() {
    this._addresses = [Address.getInstance()].concat(this._addresses);
  }

  delete(i: number) {
    this._addresses.splice(i, 1);
  }

   reset() {
    this._addresses = new Array<Address>();
  }

  /* private loadStates(): Observable<Array<State>> {
      console.log(`Loading states data`);
      return this.restService.getAll<State>(environment.STATE_URL)
        .do(
        states => {
          this._states =
           states.map(state => {
             let businessState = new State();
             businessState.id = state.id;
              businessState.stateCode = state.stateCode;
              return businessState;
          });
      },
      error => this.handleError('Loading list of states failed.')
      );
  } */

private loadStates(): void {
    console.log(`Loading states data`);
    //this.restService.getAll<State>(environment.STATE_URL) see comment on stateURL above
    this.restService.getAll<State>(this.stateURL)  
      .subscribe(
        states => {
          this._states = states.map (state=>state.stateCode);
        },
        error => this.handleError
      );
}

  private handleError(error: any): void {
    console.error('An error occurred', error);
    this.notificationService.error('An Error occured ' + error);
  }

}