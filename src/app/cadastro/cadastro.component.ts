import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.css"],
})
export class CadastroComponent {
  cadastroForm!: FormGroup;
  private apiUrl: string = "http://localhost:8080";

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private fb: FormBuilder
  ) {
    this.initializeForm();
  }

  // Inicializa o formulário com validação
  private initializeForm() {
    this.cadastroForm = this.fb.group(
      {
        nome: ["", [Validators.required, Validators.minLength(3)]],
        nascimento: ["", Validators.required],
        contato: [
          "",
          [Validators.required, Validators.pattern(/^\d{2} \d{5}-\d{4}$/)],
        ],
        email: ["", [Validators.required, Validators.email]],
        cep: [""],
        endereco: [""],
        numero: [""],
        complemento: [""],
        bairro: [""],
        cidade: [""],
        uf: [""],
      },
      { validators: this.maiorIdadeValidator }
    );
  }

  // Validação para verificar se o usuário tem mais de 18 anos
  private maiorIdadeValidator(group: FormGroup) {
    const nascimento = group.get("nascimento")?.value;
    if (!nascimento) return null;

    const dataNascimento = new Date(nascimento);
    const idade = new Date().getFullYear() - dataNascimento.getFullYear();

    return idade >= 18 ? null : { maiorIdadeValidator: true };
  }

  // Método para enviar o formulário
  public cadastrar() {
    if (this.cadastroForm.valid) {
      const cadastroObj = {
        ...this.cadastroForm.value,
        // Remove the hardcoded id since it's auto-generated
        id: null
      };
  
      this.httpClient.post(`${this.apiUrl}/cadastro`, cadastroObj).subscribe({
        next: (response) => {
          alert("Cadastro realizado com sucesso!");
          this.router.navigate(["/sucesso"]);
        },
        error: (error) => {
          console.error("Erro ao cadastrar:", error);
          alert("Erro ao cadastrar: " + (error.error || error.message));
        }
      });
    } else {
      alert("Por favor, preencha todos os campos obrigatórios corretamente.");
    }
  }
}
