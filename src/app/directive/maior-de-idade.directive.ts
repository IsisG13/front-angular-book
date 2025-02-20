import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[verificaMaiorIdade][ngModel]',
  providers: [{
    provide: NG_VALIDATORS, useExisting: VerificaMaiorIdadeValidator,
    multi: true
  }],
})
export class VerificaMaiorIdadeValidator {

}

