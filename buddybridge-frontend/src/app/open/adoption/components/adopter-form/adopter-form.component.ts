import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {MessagesModule} from "primeng/messages";
import {RippleModule} from "primeng/ripple";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-adopter-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CalendarModule,
    MessagesModule,
    RippleModule,
    RouterLink
  ],
  templateUrl: './adopter-form.component.html',
  styleUrl: './adopter-form.component.scss'
})
export class AdopterFormComponent {

  adopterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.adopterForm = this.fb.group({
      nomeCompleto: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: ['', Validators.required],
      cep: ['', Validators.required],
      endereco: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      complemento: [''],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.adopterForm.valid) {
      console.log(this.adopterForm.value);
    } else {
      // Lógica para exibir erros no formulário
      Object.keys(this.adopterForm.controls).forEach(field => {
        const control = this.adopterForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }
}
