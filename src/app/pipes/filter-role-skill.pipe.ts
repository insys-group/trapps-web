import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRoleSkill',
  pure: false

})
export class FilterRoleSkillPipe implements PipeTransform {

    transform(values: Array<any>, args:any[]):any {
        return values.filter((value) => {
            for (let i = 0; i < args.length; i++) {
                if (value[args[i][0]] != args[i][1]) {
                    return false;
                }
            }
            return true;
        });
    }

}
