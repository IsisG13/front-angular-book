import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.css"],
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formularioCadastro();
  }

  formularioCadastro() {
    this.cadastroForm = new FormGroup({
      nome: new FormControl(""),
      nascimento: new FormControl(""),
      contato: new FormControl(""),
      email: new FormControl(""),
      cep: new FormControl(""),
      endereco: new FormControl(""),
      numero: new FormControl(""),
      complemento: new FormControl(""),
      bairro: new FormControl(""),
      cidade: new FormControl(""),
      // uf: new FormControl(""),
    });
  }

  cadastrar(form: any) {
    console.log(this.cadastroForm.value);
    if (this.cadastroForm.valid) {
      this.router.navigate(['./sucesso'])
    } else {
      alert('Formulario invalido')
    }
  }
}
