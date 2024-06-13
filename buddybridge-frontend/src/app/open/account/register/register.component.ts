import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
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

  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';
  passwordFieldIcon: string = 'pi pi-eye';
  confirmPasswordFieldIcon: string = 'pi pi-eye';


  registerForm = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.uppercaseValidator,
        this.lowercaseValidator,
        this.numberValidator,
        this.specialCharValidator
      ]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8),
        this.uppercaseValidator,
        this.lowercaseValidator,
        this.numberValidator,
        this.specialCharValidator]]
    },
{validators: this.passwordMatchValidator});

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
    usuario.usuarioEndereco = undefined;

    this.accountService.salvar(usuario).subscribe(
      response => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Cadastro efetuado com sucesso.', detail: 'Agora você pode fazer login no sistema!' });
        this.registerForm.reset();
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Não é possível continuar: ', detail: 'Já existe um conta para o endereço de email fornecido' });
      }
    )
  }
    togglePasswordVisibility(field: string) {
      if (field === 'password') {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
        this.passwordFieldIcon = this.passwordFieldIcon === 'pi pi-eye' ? 'pi pi-eye-slash' : 'pi pi-eye';
      } else {
        this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
        this.confirmPasswordFieldIcon = this.confirmPasswordFieldIcon === 'pi pi-eye' ? 'pi pi-eye-slash' : 'pi pi-eye';
      }
    }

      passwordMatchValidator(form: AbstractControl) {
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');

        if (password && confirmPassword && password.value !== confirmPassword.value) {
          return { passwordMismatch: true };
        } else {
          return null;
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
