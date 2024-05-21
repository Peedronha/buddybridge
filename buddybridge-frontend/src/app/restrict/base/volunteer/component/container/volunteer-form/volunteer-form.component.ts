import { Colaborador } from '../../../model/colaborador';
import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../../../../open/account/shared/account.service';
import {VolunteerService} from "../../../service/volunteer.service";

@Component({
  selector: 'app-volunteer-form',
  templateUrl: './volunteer-form.component.html',
  styleUrl: './volunteer-form.component.scss'
})
export class VolunteerFormComponent {
  registerForm = this.fb.group({
    idcolaborador: [''],
    nome_colaborador: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    cpf_colaborador: [''],
    cnpj_colaborador: [''],
    cargo_colaborador: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    descricao_atividades_colaborador: [''],
    pf_pj_colaborador: ['']
  })

  showPj: boolean = true;

  constructor(
    private fb: FormBuilder,
    private volunteerService: VolunteerService,
    private messageService: MessageService,
    private router: ActivatedRoute,
    private route: Router,
    private accountService : AccountService
  ) { }

  ngOnInit(): void {
    this.accountService.validarSessao();
    const volunteer: Colaborador = this.router.snapshot.data['volunteer'];
    console.log(volunteer);
    this.registerForm.setValue({
      idcolaborador: volunteer.idcolaborador +'',
      nome_colaborador: volunteer.nome_colaborador,
      email: volunteer.email,
      cpf_colaborador: volunteer.cpf_colaborador,
      cnpj_colaborador: volunteer.cnpj_colaborador,
      cargo_colaborador: volunteer.cargo_colaborador,
      descricao_atividades_colaborador: volunteer.descricao_atividades_colaborador,
      pf_pj_colaborador: volunteer.pf_pj_colaborador,
    })
  }


  get idcolaborador() {
    return this.registerForm.get('idcolaborador');
  }

  get nome_colaborador() {
    return this.registerForm.get('nome_colaborador');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get cpf_colaborador() {
    return this.registerForm.get('cpf_colaborador');
  }

  get cnpj_colaborador() {
    return this.registerForm.get('cnpj_colaborador');
  }

  get cargo_colaborador() {
    return this.registerForm.get('cargo_colaborador');
  }

  get descricao_atividades_colaborador() {
    return this.registerForm.get('descricao_atividades_colaborador');
  }

  get pf_pj_colaborador() {
    return this.registerForm.get('pf_pj_colaborador');
  }

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


  submitDetails() {
    console.log(this.registerForm.get('idcolaborador')?.value+'');
    let volunteer = new Colaborador();
    var id = this.registerForm.get('idcolaborador')?.value+'';
    volunteer.idcolaborador = parseInt(id);
    volunteer.nome_colaborador = this.registerForm.get('nome_colaborador')?.value+'';
    volunteer.cpf_colaborador = this.registerForm.get('cpf_colaborador')?.value+'';
    volunteer.cnpj_colaborador = this.registerForm.get('cnpj_colaborador')?.value +'';
    volunteer.email = this.registerForm.get('email')?.value + '';
    volunteer.cargo_colaborador = this.registerForm.get('cargo_colaborador')?.value+'';
    volunteer.descricao_atividades_colaborador = this.registerForm.get('descricao_atividades_colaborador')?.value+'';
    volunteer.pf_pj_colaborador =  this.registerForm.get('pf_pj_colaborador')?.value + '';
    console.log(volunteer);
    if (this.registerForm.get('idcolaborador')?.value + '' != 'NaN'){
      this.volunteerService.updateVolunteer(volunteer).subscribe(
        response => {
          console.log(response);
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registrado com sucesso' });
          this.registerForm.reset();
          this.route.navigateByUrl('/volunteer')
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Já existe um usuário com este CPF / Email cadastrado no sistema' });
        },
      )
    } else {
      volunteer.idcolaborador = undefined;
      this.volunteerService.registerVolunteer(volunteer).subscribe(
        response => {
          console.log(response);
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Registrado com sucesso!'});
          this.registerForm.reset();
          this.route.navigateByUrl('/volunteer')
        },
        error => {
          this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Já existe um usuário cadastrado no sistema com este email.'});
        },
      )
    }
  }
}
