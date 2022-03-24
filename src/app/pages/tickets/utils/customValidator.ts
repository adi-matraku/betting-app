import {AbstractControl, ValidationErrors} from "@angular/forms";

export function customValidator() {
  return (control:AbstractControl): ValidationErrors | null => {

    let value: number[] = control.value;

    if(!value) {
      return null;
    }

    const valueLegit = control.value.length === 6;

    return !valueLegit ? {valueNonLegit: true}: null;
  }

}
