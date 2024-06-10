import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccountRestrictService } from '../../../shared/account-restrict.service';
import { User } from '../../../../../../open/account/model/user.model';
import { passwordMatchValidator } from '../../../../../../open/account/shared/password-match.directive';
import { AccountService } from '../../../../../../open/account/shared/account.service';
import { UsuarioEndereco } from '../../../../../../open/account/model/usuarioEndereco.model';

@Component({
  selector: 'app-account-form-senha',
  templateUrl: './account-form-senha.component.html',
  styleUrl: './account-form-senha.component.scss'
})
export class AccountFormSenhaComponent {

  registerForm = this.fb.group({
    id:'',
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-zA-Z]).{8,}/)]],
    confirmPassword: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-zA-Z]).{8,}/)]],
    role: [''],
    confirmacaoEmail: [''],
    token: [''],
    telefone: [''],

  }, {
    validators: passwordMatchValidator
  })

  constructor(
    private fb: FormBuilder,
    private accountRestrictService: AccountRestrictService,
    private messageService: MessageService,
    private router: ActivatedRoute,
    private route: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    const user: User = this.router.snapshot.data['account']
    console.log(user);
    this.registerForm.setValue({
      id: user.id +'',
      fullName: user.nome,
      email: user.login,
      password: '',
      confirmPassword: '',
      role: '',
      confirmacaoEmail: user.confirmacaoEmail + '',
      token: user.token+ '',
      telefone: user.telefone+'',
    })
  }

  get id() {
    return this.registerForm.controls['id'];
  }

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
    usuario.id = parseInt(this.registerForm.get('id')?.value + '');
    usuario.nome = this.registerForm.get('fullName')?.value + '';
    usuario.login = this.registerForm.get('email')?.value + '';
    usuario.senha = this.registerForm.get('password')?.value + '';
    usuario.role = this.registerForm.get('role')?.value + '';
    usuario.confirmacaoEmail = false;
    usuario.token = this.registerForm.get('toekn')?.value + '';
    usuario.telefone = this.registerForm.get('telefone')?.value + '';
    usuario.usuarioEndereco = new UsuarioEndereco();

    this.accountRestrictService.update(usuario).subscribe(
      response => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Cadastro atualizado com sucesso.', detail: '' });

      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Não é possível continuar: ', detail: 'Já existe um conta para o endereço de email fornecido' });
      }
    )
  }
}
