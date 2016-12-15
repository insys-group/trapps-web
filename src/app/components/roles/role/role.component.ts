import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NotificationService } from '../../../services/notification.service'

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  id: number;
  roleType: string;

  constructor(private location: Location,    private route: ActivatedRoute,
    
    private notificationService: NotificationService) { }

  ngOnInit() {
      this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.roleType=params['roleType'];
      console.log(`Parameter Id is ${this.id}`);
    });
  }
  cancel(): void {
    this.location.back();
  }
}
