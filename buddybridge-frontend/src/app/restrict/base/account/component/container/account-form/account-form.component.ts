import { Component } from '@angular/core';
import { User } from '../../../../../../open/account/model/user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccountRestrictService } from '../../../shared/account-restrict.service';
import { AccountService } from '../../../../../../open/account/shared/account.service';
import { passwordMatchValidator } from '../../../../../../open/account/shared/password-match.directive';
import { UsuarioEndereco } from '../../../../../../open/account/model/usuarioEndereco.model';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss'
})
export class AccountFormComponent {

  registerForm = this.fb.group({
    id: [''],
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['']
  })

  constructor(
    private fb: FormBuilder,
    private accountRestrictService: AccountRestrictService,
    private accountService:AccountService,
    private messageService: MessageService,
    private router: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.accountService.validarSessao();
    const user: User = this.router.snapshot.data['account']
    console.log(user);
    this.registerForm.setValue({
      id: user.id +'',
      fullName: user.nome,
      email: user.login,
      telefone: user.telefone+''
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
    var id = this.registerForm.get('id')?.value + '';
    if(id != null && id != '' && id != 'undefined'){
      usuario.id = parseInt(id);
    } else {
      usuario.id = undefined;
    }
    usuario.nome = this.registerForm.get('fullName')?.value + '';
    usuario.login = this.registerForm.get('email')?.value + '';
    usuario.senha = '';
    usuario.role = 'user';
    usuario.confirmacaoEmail = false;
    usuario.token = '';
    usuario.telefone = this.registerForm.get('telefone')?.value + '';
    usuario.usuarioEndereco = new UsuarioEndereco();

    if(usuario.id != undefined){
      this.accountRestrictService.update(usuario).subscribe(
        response => {
          console.log(response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Regritado com sucesso' });
          this.route.navigate(['account'])
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao realizar o cadastro' });
        }
      )
    } else {
      this.accountRestrictService.salvar(usuario).subscribe(
        response => {
          console.log(response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Regritado com sucesso' });
          this.route.navigate(['account'])
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao realizar o cadastro' });
        }
      )
    }
  }
}
