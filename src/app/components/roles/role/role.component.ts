import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NotificationService } from '../../../services/notification.service'
import { RoleService } from '../../../services/role.service';
import { Roles } from '../../../models/roles.model';
import { IResource } from '../../../resources/crud.resource';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  role: Roles = new Roles();

  id: number;
  roleType: string;
  skillType: string;

  skills: IResource[];

  constructor(private roleService: RoleService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getSkillList();
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.roleType = params['roleType'];
      this.skillType = params['skillType'];
      console.log(`Parameter Id is ${this.id}`);
    });
  }

  ngAfterViewInit() {
    if (this.id > 0) {
      this.roleService.getOne(this.id)
        .subscribe(
        role => {
          this.role = role;
        },
        error => this.handleError
        );
    }
  }

  save(): void {
    // this.role.skills = [ {id: this.role.id, name: "Swift"}]

    if (this.role.id) {
      console.log("this is id " + this.role.id)
      this.roleService.update(this.role).subscribe(role => this.handleSuccess(role),
      error => { console.log(`Error:  RoleComponent role.update() `); this.handleError }
      );
    } else {
      this.roleService.createNew(this.role).subscribe(role => this.handleSuccess(role), 
      error => { console.log(`Error:  RoleComponent role.save() `); this.handleError }
      );
    }
    error => { console.log(`Error:  RoleComponent role.save() `); this.handleError }
  }

  cancel(): void {
    this.location.back();
  }

  delete(): void {
    console.log('Enter: RoleComponent.delete()');
    this.notificationService.ask('Do you really want to delete?', ["Yes", "No"])
      .subscribe(
      result => {
        if (result === 'Yes') {
          this.roleService.delete(this.role.id).subscribe(() => this.router.navigate(['/roles']), this.handleError);
        } else {
          console.log('Dont want to delete the record');
        }
      },
      () => null
      );
  }

  private handleError(error: any): void {
    console.error('An error occurred', error);
    this.notificationService.error('An Error occured ' + error);
  }

  private handleSuccess(role: Roles): void {
    this.role = role;
    this.notificationService.info('Data saved successfully');
  }

  getSkillList() {
    console.log('Enter: RoleLComponent.ngOnInit()');
    this.roleService.getAll().subscribe(
      skills => this.skills = skills.content,
      error => this.notificationService.error(error.json().error)
    );
  }
  
}
