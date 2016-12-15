import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../../../services/role.service';
import { Roles } from '../../../models/roles.model';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from '../../../services/notification.service';
import { IResource } from '../../../resources/crud.resource';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  closeResult: string;

  errorMessage: string;

  roles: IResource[];

  constructor(private router: Router, private roleService: RoleService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.getRoleList();  
  }

  getRoleList() {
    console.log('Enter: RoleListComponent.ngOnInit()');
    this.roleService.getAll().subscribe(
      roles => this.roles = roles.content,
      error => this.notificationService.error(error.json().error)
    );
 }

  onSelect(role: Roles) {
    this.router.navigate(['/roles', role.id]);
  }

  create() {
    this.router.navigate(['/roles', 0]);
  }
}
