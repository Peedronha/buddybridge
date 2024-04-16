import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccountService } from '../shared/account.service';
import { passwordMatchValidator } from '../shared/password-match.directive';
import { User } from '../model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-zA-Z]).{8,}/)]],
    confirmPassword: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-zA-Z]).{8,}/)]]
  }, {
    validators: passwordMatchValidator
  })

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

  submitDetails() {

    let usuario = new User();
    usuario.id = undefined;
    usuario.nome = this.registerForm.get('fullName')?.value + '';
    usuario.login = this.registerForm.get('email')?.value + '';
    usuario.senha = this.registerForm.get('password')?.value + '';
    usuario.role = 'user';
    usuario.confirmacaoEmail = false;
    usuario.token = '';
    usuario.telefone = '';
    usuario.usuarioIdendereco = undefined;
    usuario.usuarioIdvoluntario = undefined;

    this.accountService.salvar(usuario).subscribe(
      response => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Cadastro efetuado com sucesso.', detail: 'Agora você pode fazer login no sistema!' });

      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Não é possível continuar: ', detail: 'Já existe um conta para o endereço de email fornecido' });
      }
    )
  }

}
