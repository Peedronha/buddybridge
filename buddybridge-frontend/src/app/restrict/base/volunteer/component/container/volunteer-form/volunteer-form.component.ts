import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../../../../open/account/shared/account.service';
import {VolunteerService} from "../../../service/volunteer.service";
import { User } from '../../../../../../open/account/model/user.model';
import { AccountRestrictService } from '../../../../account/shared/account-restrict.service';
import { Colaborador } from '../../../model/colaborador';

@Component({
  selector: 'app-volunteer-form',
  templateUrl: './volunteer-form.component.html',
  styleUrl: './volunteer-form.component.scss'
})
export class VolunteerFormComponent {
  registerForm = this.fb.group({
    idcolaborador: [''],
    nome_colaborador: ['', [Validators.required]],
    cpf_colaborador: [''],
    cnpj_colaborador: [''],
    cargo_colaborador: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    descricao_atividades_colaborador: [''],
    pf_pj_colaborador: [''],
    usuario: [null as User | null, Validators.required] // Select de usuários
  });

  userOptions: User[] = []; // Lista de usuários para o select
  showPj: boolean = true;

  constructor(
    private fb: FormBuilder,
    private volunteerService: VolunteerService,
    private messageService: MessageService,
    private accountRestrictService: AccountRestrictService,
    private router: ActivatedRoute,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.accountRestrictService.getUsers().subscribe((users: User[]) => {
      this.userOptions = users;
    })



    const colaborador: Colaborador = this.router.snapshot.data['volunteer'];
    this.registerForm.setValue({
      idcolaborador: colaborador.idcolaborador ? colaborador.idcolaborador + '' : '',
      nome_colaborador: colaborador.usuarioColaborador != null ? colaborador.usuarioColaborador?.nome! : "",
      cpf_colaborador: colaborador.cpf_colaborador || '',
      cnpj_colaborador: colaborador.cnpj_colaborador || '',
      cargo_colaborador: colaborador.cargo_colaborador || '',
      descricao_atividades_colaborador: colaborador.descricao_atividades_colaborador || '',
      pf_pj_colaborador: colaborador.pf_pj_colaborador || '',
      usuario: colaborador.usuarioColaborador || null
    });

    //Valide preencher conforme o campo pf_pj_colaborador - se igual Pessoa Fisica vir como false, se não - vir como true
    this.showPj = colaborador.pf_pj_colaborador === 'Pessoa Jurídica';
  }

  // Carrega os usuários
  loadUsers() {
    this.accountRestrictService.listar().subscribe(users => {
      this.userOptions = users;
    }, error => {
      console.error('Erro ao carregar os usuários', error);
    });
  }

  // Alterna entre CPF e CNPJ
  updateState() {
    this.showPj = !this.showPj;
    if (!this.showPj) {
      this.registerForm.get('cpf_colaborador')?.setValidators([Validators.required, Validators.pattern(/[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/)]);
      this.registerForm.get('cnpj_colaborador')?.clearValidators();
      this.registerForm.get('cnpj_colaborador')?.disable();
      this.registerForm.get('cpf_colaborador')?.enable();
    } else {
      this.registerForm.get('cnpj_colaborador')?.setValidators([Validators.required, Validators.pattern(/[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/)]);
      this.registerForm.get('cpf_colaborador')?.clearValidators();
      this.registerForm.get('cpf_colaborador')?.disable();
      this.registerForm.get('cnpj_colaborador')?.enable();
    }
    this.registerForm.get('cpf_colaborador')?.updateValueAndValidity();
    this.registerForm.get('cnpj_colaborador')?.updateValueAndValidity();
  }

  isPessoaJuridica(): boolean {
    return this.showPj;
  }

  // Submissão do formulário
  submitDetails() {
    let volunteer = new Colaborador();
    let id = this.registerForm.get('idcolaborador')?.value ? parseInt(this.registerForm.get('idcolaborador')?.value + '') : undefined;

    volunteer.idcolaborador = id;
    volunteer.cpf_colaborador = this.registerForm.get('cpf_colaborador')?.value + '';
    volunteer.cnpj_colaborador = this.registerForm.get('cnpj_colaborador')?.value + '';
    volunteer.cargo_colaborador = this.registerForm.get('cargo_colaborador')?.value + '';
    volunteer.descricao_atividades_colaborador = this.registerForm.get('descricao_atividades_colaborador')?.value + '';
    volunteer.pf_pj_colaborador = this.registerForm.get('pf_pj_colaborador')?.value + '';
    volunteer.usuarioColaborador = this.registerForm.get('usuario')?.value; // Relaciona o usuário

    //console.log("id -> "+id);
    if (id+"" !== "undefined") {
      this.volunteerService.updateVolunteer(volunteer).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Atualizado com sucesso' });
          this.registerForm.reset();
          this.route.navigateByUrl('/volunteer');
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Já existe um usuário com este CPF / Email cadastrado no sistema' });
        }
      );
    } else {
      volunteer.idcolaborador = undefined;
      this.volunteerService.registerVolunteer(volunteer).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registrado com sucesso!' });
          this.registerForm.reset();
          this.route.navigateByUrl('/volunteer');
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Já existe um usuário cadastrado no sistema com este CNPJ.' });
        }
      );
    }
  }
}
