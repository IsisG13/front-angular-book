import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[verificaMaiorIdade][ngModel]',
  providers: [{
    provide: NG_VALIDATORS, useExisting: VerificaMaiorIdadeValidator,
    multi: true
  }],
})
export class VerificaMaiorIdadeValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {

    const anoNasc = control.value;

    const anoAtual = new Date().getFullYear();
    console.log(anoAtual);

    const anoMais18anos = anoNasc + 18;
    const ehMaior = anoMais18anos <= anoAtual;
    return ehMaior ? null: { 'verificaMaiorIdade' : true }
  }
}

