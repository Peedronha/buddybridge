import { GrupoacessoserviceService } from './../../../../grupo_acesso/service/grupoacessoservice.service';
import { Component } from '@angular/core';
import { User } from '../../../../../../open/account/model/user.model';
import { FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccountRestrictService } from '../../../shared/account-restrict.service';
import { UsuarioEndereco } from '../../../../../../open/account/model/usuarioEndereco.model';
import { GrupoAcesso } from '../../../../grupo_acesso/model/grupoAcesso';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss'
})
export class AccountFormComponent {

  gruposAcesso: GrupoAcesso[] = [];

  registerForm = this.fb.group({
    id: '',
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    telefone: [''],  // Mantemos telefone como opcional
    password: [''],
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
    grupoAcessoUsuario: [null as GrupoAcesso | null, [Validators.required]],
  }, {});

  constructor(
    private fb: FormBuilder,
    private accountRestrictService: AccountRestrictService,
    private messageService: MessageService,
    private router: ActivatedRoute,
    private route: Router,
    private grupoacessoservice: GrupoacessoserviceService
  ) { }

  ngOnInit(): void {
    const data: User = this.router.snapshot.data['account']
    this.registerForm.setValue({
      id: data.id + '',
      fullName: data.nome,
      email: data.login,
      telefone: data.telefone || '',
      password: '',
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
    this.grupoacessoservice.getGruposAcessoAtivo().subscribe((grupos: GrupoAcesso[]) => {
      this.gruposAcesso = grupos;
      console.log('Grupos de Acesso:', this.gruposAcesso);
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


  get telefone() {
    return this.registerForm.controls['telefone'];
  }

  submitDetails() {
    let usuario = new User();

    usuario.id = parseInt(this.registerForm.get('id')?.value ?? '0');
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

    if (usuario.id + '' != 'NaN') {
      this.accountRestrictService.update(usuario).subscribe(
        response => {
          console.log(response);
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Atualizado com sucesso' });
          this.route.navigate(['account'])
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar dados do usuário' });
        }
      )
    } else {
      this.accountRestrictService.salvar(usuario).subscribe(
        response => {
          console.log(response);
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Regritado com sucesso' });
          this.route.navigate(['account'])
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao cadastrar dados do usuário - já existe um login com este e-mail' });
        }
      )
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
