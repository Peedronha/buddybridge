import { AccountService } from './../shared/account.service';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../restrict/layout/service/app.layout.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../model/login.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-validatelogin',
  templateUrl: './validatelogin.component.html',
  styleUrl: './validatelogin.component.scss'
})
export class ValidateloginComponent {

  constructor(
    private accountService: AccountService,
    private router: Router,
    public layoutService: LayoutService,
    private fb: FormBuilder,
    private messageService : MessageService)
  {
  }

  loginForm = this.fb.group({
    login: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required],
    otp: ['', Validators.required]
  })

  get login() {
    return this.loginForm.controls['login'];
  }

  get otp() {
    return this.loginForm.controls['otp'];
  }

  get senha() {
    return this.loginForm.controls['senha'];
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    try {
      let autenticacao = new Login();
      autenticacao.username = this.loginForm.get('login')?.value + '';
      autenticacao.password = this.loginForm.get('senha')?.value + '';
      autenticacao.otp = this.loginForm.get('otp')?.value + '';
      const result = await this.accountService.login(autenticacao);

      var solicitarToken = window.localStorage.getItem('validarEmail') + '';
      if(solicitarToken == 'true'){
        this.messageService.add({ severity: 'error', summary: 'Login Inválido', detail: 'As informações digitadas são inválidas' });
        window.location.href='/validatelogin';
      }


      this.router.navigate(['']);
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Login Inválido', detail: 'Senha e/ou Email digitados inválidos' });
      console.error(error);
    }
  }

}
