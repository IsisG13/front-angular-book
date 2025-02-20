import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[maiorIdadeValidator]',
  providers: [{
    provide: NG_VALIDATORS, 
    useExisting: MaiorIdadeDirective,
    multi: true
  }],
})
export class MaiorIdadeDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {

    const dataNascimento = control.value;
    const anoNasc = new Date(dataNascimento).getFullYear();
    const anoMais18anos = anoNasc + 18;
    const anoAtual = new Date().getFullYear();
    
    console.log(anoAtual);

    const ehMaior = anoMais18anos <= anoAtual;
    return ehMaior ? null: { 'maiorIdadeValidator' : true }
  }
}