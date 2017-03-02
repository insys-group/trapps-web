import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hello Angular with CLI';
  environment = environment;
  userLoggedIn = localStorage.getItem('token')

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log("Enter: AppComponent ngOnInit()");
  }

}
