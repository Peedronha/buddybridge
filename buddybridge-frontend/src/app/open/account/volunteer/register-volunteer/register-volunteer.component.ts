import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {passwordMatchValidator} from "../../shared/password-match.directive";
import {AccountService} from "../../shared/account.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {User} from "../../model/user.model";
import {Volunteer} from "../../../../restrict/base/volunteer/model/volunteer.model";
import {VolunteerService} from "../service/volunteer.service";

@Component({
  selector: 'app-register-volunteer',
  templateUrl: './register-volunteer.component.html',
  styleUrl: './register-volunteer.component.scss'
})
export class RegisterVolunteerComponent {

  registerForm = this.fb.group({
    nome_voluntario: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    cpf_voluntario: [''],
    cnpj_voluntario: [''],
    cargo_voluntario: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    descricao_atividades_voluntario: [''],
    pf_pj_voluntario: ['']
  })

  showPj: boolean = true;

  constructor(
    private fb: FormBuilder,
    private volunteerService: VolunteerService,
    private messageService: MessageService,
    private router: Router
  ) { }

  get nome_voluntario() {
    return this.registerForm.get('nome_voluntario');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get cpf_voluntario() {
    return this.registerForm.get('cpf_voluntario');
  }

  get cnpj_voluntario() {
    return this.registerForm.get('cnpj_voluntario');
  }

  get cargo_voluntario() {
    return this.registerForm.get('cargo_voluntario');
  }

  get descricao_atividades_voluntario() {
    return this.registerForm.get('descricao_atividades_voluntario');
  }

  get pf_pj_voluntario() {
    return this.registerForm.get('pf_pj_voluntario');
  }

  updateState() {
    this.showPj = !this.showPj;
    if (!this.showPj) {
      this.registerForm.get('cpf_voluntario')?.setValidators([Validators.required, Validators.pattern(/[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/)]);
      this.registerForm.get('cnpj_voluntario')?.clearValidators();
      this.registerForm.get('cnpj_voluntario')?.disable();
    } else {
      this.registerForm.get('cnpj_voluntario')?.setValidators([Validators.required, Validators.pattern(/[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/)]);
      this.registerForm.get('cpf_voluntario')?.clearValidators();
      this.registerForm.get('cpf_voluntario')?.disable();
    }

    this.registerForm.get('cpf_voluntario')?.updateValueAndValidity();
    this.registerForm.get('cnpj_voluntario')?.updateValueAndValidity();
  }

  submitDetails() {
    const postData = { ...this.registerForm.value };
    if (!this.showPj) {
      postData.pf_pj_voluntario = 'PESSOA JURIDICA';
    }
      postData.pf_pj_voluntario = 'PESSOA FISICA'
    this.volunteerService.registerVolunteer(postData as Volunteer).subscribe(
      response => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register successfully' });
        this.registerForm.reset();
        this.router.navigateByUrl('/volunteer')
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      },
    )
  }

  resetForm() {
    this.registerForm.reset();
  }
}
