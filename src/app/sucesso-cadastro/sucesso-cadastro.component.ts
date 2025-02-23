import { Component, Input, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-sucesso-cadastro",
  templateUrl: "./sucesso-cadastro.component.html",
  styleUrls: ["./sucesso-cadastro.component.css"],
})
export class SucessoCadastroComponent {
  private apiUrl: string = environment.apiUrl;
  pessoas: any[] = [];
  pessoasAgrupadas: { [key: string]: any[] } = {};

  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit() {
    this.listar();
  }

  // Método para listar as pessoas cadastradas.
  listar() {
    this.httpClient.get<any[]>(`${this.apiUrl}/listar`).subscribe(
      (data) => {
        this.pessoas = data;
        this.agrupadosPorLetra();
      },
      (error) => {
        console.error("Erro ao listar pessoas:", error);
      }
    );
  }

  cadastrar() {
    this.router.navigate(["/cadastro"]);
  }

  private agrupadosPorLetra() {
    this.pessoasAgrupadas = {};

    this.pessoas.forEach((pessoa) => {
      const letra = pessoa.nome.charAt(0).toUpperCase();

      if (!this.pessoasAgrupadas[letra]) {
        this.pessoasAgrupadas[letra] = [];
      }

      this.pessoasAgrupadas[letra].push(pessoa);
    });
  }
}
