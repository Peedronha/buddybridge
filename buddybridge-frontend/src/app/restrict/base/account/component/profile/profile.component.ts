import { Component } from '@angular/core';
import { AccountRestrictService } from '../../shared/account-restrict.service';
import { AccountService } from '../../../../../open/account/shared/account.service';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { passwordMatchValidator } from '../../../../../open/account/shared/password-match.directive';
import { User } from '../../../../../open/account/model/user.model';
import { UsuarioEndereco } from '../../../../../open/account/model/usuarioEndereco.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  registerForm = this.fb.group({
    id: '',
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    telefone: [''],
    password: ['',  [
      Validators.required,
      Validators.minLength(8),
      this.uppercaseValidator,
      this.lowercaseValidator,
      this.numberValidator,
      this.specialCharValidator
    ]],
    confirmPassword: ['', [
      Validators.required,
      Validators.minLength(8),
      this.uppercaseValidator,
      this.lowercaseValidator,
      this.numberValidator,
      this.specialCharValidator
    ]]
  }, {
    validators: passwordMatchValidator
  })

  constructor(
    private fb: FormBuilder,
    private accountRestrictService: AccountRestrictService,
    private accountService:AccountService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    var id = window.localStorage.getItem('idUser');
    this.accountRestrictService.loadById(id+'').subscribe();

    this.accountRestrictService.loadById(id+'').subscribe((data: User) => {
      console.log(data);
      this.registerForm.setValue({
        id: data.id +'',
        fullName: data.nome,
        email: data.login,
        password: "",
        confirmPassword: "",
        telefone: data.telefone+''
      })
    });
  }

  get fullName() {
    return this.registerForm.controls['fullName'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get telefone() {
    return this.registerForm.controls['telefone'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  submitDetails() {
    let usuario = new User();
    usuario.id = parseInt(window.localStorage.getItem('idUser')+'');
    usuario.nome = this.registerForm.get('fullName')?.value + '';
    usuario.login = this.registerForm.get('email')?.value + '';
    usuario.senha = this.registerForm.get('password')?.value + '';
    usuario.role = '';
    usuario.confirmacaoEmail = false;
    usuario.token = '';
    usuario.telefone = this.registerForm.get('telefone')?.value + '';
    usuario.usuarioEndereco = new UsuarioEndereco();

    this.accountRestrictService.update(usuario).subscribe(
      response => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Regritado com sucesso' });
        this.router.navigate(['dashboard'])
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao realizar o cadastro' });
      }
    )
  }

  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';
  passwordFieldIcon: string = 'pi pi-eye';
  confirmPasswordFieldIcon: string = 'pi pi-eye';

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
      this.passwordFieldIcon = this.passwordFieldIcon === 'pi pi-eye' ? 'pi pi-eye-slash' : 'pi pi-eye';
    } else {
      this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
      this.confirmPasswordFieldIcon = this.confirmPasswordFieldIcon === 'pi pi-eye' ? 'pi pi-eye-slash' : 'pi pi-eye';
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
