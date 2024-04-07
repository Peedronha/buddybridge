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
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
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
    usuario.idUsuario = undefined;
    usuario.nomeUsuario = this.registerForm.get('fullName')?.value + '';
    usuario.emailUsuario = this.registerForm.get('email')?.value + '';
    usuario.senhaUsuario = this.registerForm.get('password')?.value + '';
    usuario.adminUsuario = false;
    usuario.confirmacaoEmailUsuario = false;
    usuario.ongUsuario = false;
    usuario.tokenUsuario = false;
    usuario.telefoneUsuario = false;
    usuario.enderecoIdendereco = undefined;
    usuario.voluntarioIdvoluntario = undefined;

    this.accountService.salvar(usuario).subscribe(
      response => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Regritado com sucesso' });
        this.router.navigate(['login'])
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao realizar o cadastro' });
      }
    )
  }

}
