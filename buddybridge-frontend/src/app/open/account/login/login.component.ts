import { AccountService } from './../shared/account.service';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../restrict/layout/service/app.layout.service';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../model/login.model';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  implements OnInit {

  constructor(
    private accountService: AccountService,
    private router: Router,
    public layoutService: LayoutService,
    private fb: FormBuilder,
    private messageService : MessageService) { }

  loginForm = this.fb.group({
    login: ['', [Validators.required, Validators.email]],
    senha: ['',  [
      Validators.required,
      Validators.minLength(8),
      this.uppercaseValidator,
      this.lowercaseValidator,
      this.numberValidator,
      this.specialCharValidator
    ]],
  })

  passwordFieldType: string = 'password';
  passwordFieldIcon: string = 'pi pi-eye';

  get login() {
    return this.loginForm.controls['login'];
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    try {
      let autenticacao = new Login();
      autenticacao.username = this.loginForm.get('login')?.value + '';
      autenticacao.password = this.loginForm.get('senha')?.value + '';
      const result = await this.accountService.login(autenticacao);
      this.router.navigate(['']);
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Login Inválido', detail: 'Senha e/ou Email digitados inválidos' });
      console.error(error);
    }
  }

  togglePasswordVisibility(field: string): void {
      if (this.passwordFieldType === 'password') {
        this.passwordFieldType = 'text';
        this.passwordFieldIcon = 'pi pi-eye-slash';
      } else {
        this.passwordFieldType = 'password';
        this.passwordFieldIcon = 'pi pi-eye';
    }
  }


  uppercaseValidator(control: AbstractControl) {
    const hasUppercase = /[A-Z]/.test(control.value);
    return hasUppercase ? null : { uppercase: true };
  }

  lowercaseValidator(control: AbstractControl) {
    const hasLowercase = /[a-z]/.test(control.value);
    return hasLowercase ? null : { lowercase: true };
  }

  numberValidator(control: AbstractControl) {
    const hasNumber = /\d/.test(control.value);
    return hasNumber ? null : { number: true };
  }

  specialCharValidator(control: AbstractControl) {
    const hasSpecialChar = /[@$!%*?&]/.test(control.value);
    return hasSpecialChar ? null : { specialChar: true };
  }
}
