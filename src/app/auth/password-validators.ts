import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function notContainUserName(firstName: string, lastName: string): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    if (control.value.indexOf(firstName) != -1) {
      return { 'notContainUserName': true, 'firstName': 'cannot contain first name' }
    } else if (control.value.indexOf(lastName) != -1) {
      return { 'notContainUserName': true, 'firstName': 'cannot contain first name' }
    } else {
      return null;
    }
  }

}

export const AuthValidators = {
  notContainUserName: notContainUserName
}
