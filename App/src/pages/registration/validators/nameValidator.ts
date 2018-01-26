/** A hero's name can't match the given regular expression */
import { ValidatorFn } from "@angular/forms/src/directives/validators";
import { AbstractControl, FormControl } from "@angular/forms/src/model";

export function nameValidator(control: FormControl) {
    console.log(control);
    let problem = false;
    let regexp = new RegExp('^[a-zA-ZöÖäÄüÜ]*$');
    if (!regexp.test(control.value)) problem = true;
    return problem ? { 'invalidName': { value: control.value } } : null;
}