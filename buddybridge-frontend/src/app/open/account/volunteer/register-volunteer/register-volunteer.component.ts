import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {passwordMatchValidator} from "../../shared/password-match.directive";
import {AccountService} from "../../shared/account.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {User} from "../../model/user.model";
import {Volunteer} from "../../model/volunteer.model";

@Component({
  selector: 'app-register-volunteer',
  templateUrl: './register-volunteer.component.html',
  styleUrl: './register-volunteer.component.scss'
})
export class RegisterVolunteerComponent {
  registerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    cpf_voluntario: ['', Validators.required],
    cnpj_voluntario: ['', Validators.required],
    cargo_voluntario: ['', Validators.required],
    descricao_atividades_voluntario: [''],
    pf_pj_voluntario: ['', Validators.required]
  }, {
    validators: passwordMatchValidator
  })

  showPj: boolean = true;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private messageService: MessageService,
    private router: Router
  ) { }

  get fullName() {
    return this.registerForm.controls['fullName'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
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

  updateState(){
    this.showPj = !this.showPj;
  }

  submitDetails() {
    const postData = { ...this.registerForm.value };
    if (!this.showPj) {
      postData.pf_pj_voluntario = 'Pessoa Fisica';
    }

    this.accountService.registerUser(postData as Volunteer).subscribe(
      response => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register successfully' });
        this.router.navigate(['login'])
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }
    )
  }
}
