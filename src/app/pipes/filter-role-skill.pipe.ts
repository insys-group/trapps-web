import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRoleSkill',
  pure: false

})
export class FilterRoleSkillPipe implements PipeTransform {

    transform(roles: any[], selectedId: number): any {
        if(selectedId === -1)
          return roles;
        return roles.filter(item => item.id === selectedId);
    }
}
