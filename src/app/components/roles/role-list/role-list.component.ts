import {Component, OnInit, Input} from '@angular/core';
import {RoleService} from "../../../services/role.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../../services/notification.service";
import {LoadingService} from "../../../services/loading.service";
import {Role, Skill} from "../../../models/role.model";
import {ConfirmService} from "../../../services/confirm.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  constructor(private router: Router,
              private notificationService: NotificationService,
              private confirmService: ConfirmService,
              private loadingService: LoadingService,
              private roleService: RoleService,
              private modalService: NgbModal) {
  }

  roles;
  skills;
  skillsFromRole;

  newRole: Role = new Role();
  newSkill: Skill = new Skill();

  ngOnInit() {
    this.getRoles();
    this.getSkills();
  }

  getRoles() {
    this.loadingService.show();
    this.roleService.getAll()
      .subscribe(
        roles => {
          this.loadingService.hide();
          if (roles[0] && roles[0].id) {
            this.roles = roles;
          }
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error)
        }
      )
  }

  saveRole() {
    this.loadingService.show();
    this.roleService.save(this.newRole)
      .subscribe(
        role => {
          this.loadingService.hide();
          this.newRole = new Role();
          this.getRoles();
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error)
        }
      )
  }

  updateRole() {
    this.loadingService.show();
    this.roleService.update(this.newRole)
      .subscribe(
        role => {
          this.loadingService.hide();
          this.newRole = new Role();
          this.getRoles();
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error)
        }
      )
  }

  selectRole(role: Role) {
    this.newRole = role;
    this.getSkillsFromRole();
  }

  removeRole(role: Role) {
    let self = this;
    this.confirmService.confirm(
      'Are you sure you want to remove the role?',
      '',
      function () {
        self.loadingService.show();
        self.roleService.remove(role)
          .subscribe(
            roles => {
              self.loadingService.hide();
              self.getRoles();
            },
            error => {
              self.loadingService.hide();
              if(error.error._body.indexOf('foreign key constraint fails')){
                self.notificationService.error('The role can\'t be removed, it has a relation with a Person/Interview/Skill.');
              }else {
                self.notificationService.notifyError(error);
              }
            }
          );
      }
    );
  }

  cancelRole() {
    this.newRole = new Role();
    this.getSkills();
  }

  //*************************************** SKILLS *************************************** 

  getSkills() {
    this.loadingService.show();
    this.roleService.getAllSkills()
      .subscribe(
        skills => {
          this.loadingService.hide();
          if (skills[0] && skills[0].id) {
            this.skills = skills;
          }
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error)
        }
      )
  }

  saveSkill() {
    this.loadingService.show();
    this.roleService.saveSkill(this.newSkill)
      .subscribe(
        skill => {
          this.loadingService.hide();
          this.newSkill = new Skill();
          this.getSkills();
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error)
        }
      )
  }

  updateSkill() {
    this.loadingService.show();
    this.roleService.updateSkill(this.newSkill)
      .subscribe(
        skill => {
          this.loadingService.hide();
          this.newSkill = new Skill();
          this.getSkills();
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error)
        }
      )
  }

  selectSkill(skill: Skill) {
    this.newSkill = skill;
  }

  removeSkill(skill: Skill) {
    let self = this;
    this.confirmService.confirm(
      'Are you sure you want to remove the skill?',
      '',
      function () {
        self.loadingService.show();
        self.roleService.removeSkill(skill)
          .subscribe(
            skills => {
              self.loadingService.hide();
              self.getSkills();
            },
            error => {
              self.loadingService.hide();
              if(error.error._body.indexOf('foreign key constraint fails')){
                self.notificationService.error('The skill can\'t be removed, it has a relation with a Role.');
              }else {
                self.notificationService.notifyError(error);
              }
            }
          );
      }
    );
  }

  cancelSkill() {
    this.newSkill = new Skill();
    this.cancelRole();
  }

  getSkillsFromRole() {
    this.loadingService.show();
    this.roleService.getSkills(this.newRole)
      .subscribe(
        skills => {
          this.loadingService.hide();
          this.skillsFromRole = skills;
          this.compareSkills();
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error)
        }
      )
  }

  compareSkills(){
    let self = this;
    if(this.skills && this.skills.length > 0){
      this.skills.forEach(function(skill){
        skill.selected = false;
        if(this.skillsFromRole && this.skillsFromRole.length > 0) {
          self.skillsFromRole.forEach(function (skillAux) {
            if (skill.id == skillAux.id) {
              skill.selected = true;
            }
          })
        }
      });
    }
  }

  saveSkills() {

    let skills = [];
    this.skills.forEach(function(skill){
      if(skill.selected){
        skills.push(skill);
      }
    });

    this.newRole.skills = skills;
    this.loadingService.show();

    this.roleService.saveSkills(this.newRole)
      .subscribe(
        role => {
          this.loadingService.hide();
          this.newRole = role;
          // this.newSkill = new Skill();
          // this.getRoles();
          // this.getSkills();
        },
        error => {
          this.loadingService.hide();
          this.notificationService.notifyError(error)
        }
      );
    // console.log(this.newRole);
  }

}
