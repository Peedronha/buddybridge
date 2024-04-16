import { AccountService } from './../shared/account.service';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../restrict/layout/service/app.layout.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../model/login.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrl: './recovery.component.scss',
})
export class RecoveryComponent {
  recoverForm = this.fb.group({
    login: ['', [Validators.required, Validators.email]],
  })

  get login() {
    return this.recoverForm.controls['login'];
  }

  constructor(
    private accountService: AccountService,
    private router: Router,
    public layoutService: LayoutService,
    private fb: FormBuilder,
    private messageService : MessageService) { }

    async onSubmit() {
      try {
        let autenticacao = new Login();
        autenticacao.username = this.recoverForm.get('login')?.value + '';
        autenticacao.password = '';
        autenticacao.otp = '';
        this.accountService.enviarTokenRecuperacao(autenticacao);
        window.location.href='/login';
      } catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Login Inválido', detail: 'Senha e/ou Email digitados inválidos' });
        console.error(error);
      }
    }

}
