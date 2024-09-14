import { Component } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccountRestrictService } from '../../../shared/account-restrict.service';
import { User } from '../../../../../../open/account/model/user.model';
import { passwordMatchValidator } from '../../../../../../open/account/shared/password-match.directive';
import { AccountService } from '../../../../../../open/account/shared/account.service';
import { UsuarioEndereco } from '../../../../../../open/account/model/usuarioEndereco.model';
import { GrupoAcesso } from '../../../../grupo_acesso/model/grupoAcesso';

@Component({
  selector: 'app-account-form-senha',
  templateUrl: './account-form-senha.component.html',
  styleUrl: './account-form-senha.component.scss'
})
export class AccountFormSenhaComponent {

  registerForm = this.fb.group({
    id: '',
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    telefone: [''],  // Mantemos telefone como opcional
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      this.uppercaseValidator,
      this.lowercaseValidator,
      this.numberValidator,
      this.specialCharValidator
    ]],
    confirmPassword: ['', [Validators.required]], // Remove as outras validações, que serão feitas apenas na senha
    role: [''],
    confirmacaoEmail: [false],
    token: [''],
    usuarioEndereco: this.fb.group({
      rua: [''],
      numero: [''],
      cidade: [''],
      estado: [''],
      cep: ['']
    }),
    grupoAcessoUsuario: [null as GrupoAcesso | null],
  }, {
    validators: this.passwordMatchValidator // Mantém a validação das senhas iguais aqui
  });

  constructor(
    private fb: FormBuilder,
    private accountRestrictService: AccountRestrictService,
    private messageService: MessageService,
    private router: ActivatedRoute,
    private route: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    const data: User = this.router.snapshot.data['account']

    this.registerForm.setValue({
      id: data.id + '',
      fullName: data.nome,
      email: data.login,
      telefone: data.telefone || '',
      password: '',
      confirmPassword: '',
      role: data.role,
      confirmacaoEmail: data.confirmacaoEmail || false,
      token: data.token || '',
      usuarioEndereco: {
        rua: data.usuarioEndereco?.logradouroEndereco || '',
        numero: data.usuarioEndereco?.numeroEndereco || '',
        cidade: data.usuarioEndereco?.cidadeEndereco || '',
        estado: data.usuarioEndereco?.estadoEndereco || '',
        cep: data.usuarioEndereco?.cepEndereco || ''
      },
      grupoAcessoUsuario: data.grupoAcessoUsuario || null,
    });

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
    usuario.id = parseInt(window.localStorage.getItem('idUser') ?? '0');  // Default to '0' if getItem returns null
    usuario.nome = this.registerForm.get('fullName')?.value + '';
    usuario.login = this.registerForm.get('email')?.value ?? '';
    usuario.senha = this.registerForm.get('password')?.value + '';
    usuario.role = this.registerForm.get('role')?.value ?? '';
    usuario.confirmacaoEmail = this.registerForm.get('confirmacaoEmail')?.value ?? false;
    usuario.token = this.registerForm.get('token')?.value ?? '';
    usuario.telefone = this.registerForm.get('telefone')?.value ?? '';
    usuario.usuarioEndereco = new UsuarioEndereco();
    usuario.usuarioEndereco.logradouroEndereco = this.registerForm.get('usuarioEndereco.rua')?.value ?? '';
    usuario.usuarioEndereco.numeroEndereco = this.registerForm.get('usuarioEndereco.numero')?.value ?? '';
    usuario.usuarioEndereco.cidadeEndereco = this.registerForm.get('usuarioEndereco.cidade')?.value ?? '';
    usuario.usuarioEndereco.estadoEndereco = this.registerForm.get('usuarioEndereco.estado')?.value ?? '';
    usuario.usuarioEndereco.cepEndereco = this.registerForm.get('usuarioEndereco.cep')?.value ?? '';
    usuario.grupoAcessoUsuario = this.registerForm.get('grupoAcessoUsuario')?.value;

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

  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';
  passwordFieldIcon: string = 'pi pi-eye';
  confirmPasswordFieldIcon: string = 'pi pi-eye';


  // Toggle visibility for password and confirmPassword fields
  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    } else if (field === 'confirmPassword') {
      this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
    }
  }

  // Custom validators
  uppercaseValidator(control: AbstractControl): ValidationErrors | null {
    return /[A-Z]/.test(control.value) ? null : { uppercase: true };
  }

  lowercaseValidator(control: AbstractControl): ValidationErrors | null {
    return /[a-z]/.test(control.value) ? null : { lowercase: true };
  }

  numberValidator(control: AbstractControl): ValidationErrors | null {
    return /\d/.test(control.value) ? null : { number: true };
  }

  specialCharValidator(control: AbstractControl): ValidationErrors | null {
    return /[@$!%*?&]/.test(control.value) ? null : { specialChar: true };
  }

  // Ensure passwords match
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password === confirmPassword ? null : { passwordMismatch: true };
  }
}
