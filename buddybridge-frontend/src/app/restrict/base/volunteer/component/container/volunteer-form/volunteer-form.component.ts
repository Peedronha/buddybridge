import { Volunteer } from './../../../model/volunteer.model';
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
    idvoluntario: [''],
    nome_voluntario: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    cpf_voluntario: [''],
    cnpj_voluntario: [''],
    cargo_voluntario: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    descricao_atividades_voluntario: [''],
    pf_pj_voluntario: ['']
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
    const volunteer: Volunteer = this.router.snapshot.data['volunteer'];
    console.log(volunteer);
    this.registerForm.setValue({
      idvoluntario: volunteer.idvoluntario +'',
      nome_voluntario: volunteer.nome_voluntario,
      email: volunteer.email,
      cpf_voluntario: volunteer.cpf_voluntario,
      cnpj_voluntario: volunteer.cnpj_voluntario,
      cargo_voluntario: volunteer.cargo_voluntario,
      descricao_atividades_voluntario: volunteer.descricao_atividades_voluntario,
      pf_pj_voluntario: volunteer.pf_pj_voluntario,
    })
  }


  get idvoluntario() {
    return this.registerForm.get('idvoluntario');
  }

  get nome_voluntario() {
    return this.registerForm.get('nome_voluntario');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get cpf_voluntario() {
    return this.registerForm.get('cpf_voluntario');
  }

  get cnpj_voluntario() {
    return this.registerForm.get('cnpj_voluntario');
  }

  get cargo_voluntario() {
    return this.registerForm.get('cargo_voluntario');
  }

  get descricao_atividades_voluntario() {
    return this.registerForm.get('descricao_atividades_voluntario');
  }

  get pf_pj_voluntario() {
    return this.registerForm.get('pf_pj_voluntario');
  }

  updateState() {
    this.showPj = !this.showPj;
    if (!this.showPj) {
      this.registerForm.get('cpf_voluntario')?.setValidators([Validators.required, Validators.pattern(/[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/)]);
      this.registerForm.get('cnpj_voluntario')?.clearValidators();
      this.registerForm.get('cnpj_voluntario')?.disable();
      this.registerForm.get('cpf_voluntario')?.enable();
    } else {
      this.registerForm.get('cnpj_voluntario')?.setValidators([Validators.required, Validators.pattern(/[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/)]);
      this.registerForm.get('cpf_voluntario')?.clearValidators();
      this.registerForm.get('cpf_voluntario')?.disable();
      this.registerForm.get('cnpj_voluntario')?.enable();
    }
    this.registerForm.get('cpf_voluntario')?.updateValueAndValidity();
    this.registerForm.get('cnpj_voluntario')?.updateValueAndValidity();
  }

  isPessoaJuridica(): boolean {
    return this.showPj;
  }


  submitDetails() {
    console.log(this.registerForm.get('idvoluntario')?.value+'');
    let volunteer = new Volunteer();
    var id = this.registerForm.get('idvoluntario')?.value+'';
    volunteer.idvoluntario = parseInt(id);
    volunteer.nome_voluntario = this.registerForm.get('nome_voluntario')?.value+'';
    volunteer.cpf_voluntario = this.registerForm.get('cpf_voluntario')?.value+'';
    volunteer.cnpj_voluntario = this.registerForm.get('cnpj_voluntario')?.value +'';
    volunteer.email = this.registerForm.get('email')?.value + '';
    volunteer.cargo_voluntario = this.registerForm.get('cargo_voluntario')?.value+'';
    volunteer.descricao_atividades_voluntario = this.registerForm.get('descricao_atividades_voluntario')?.value+'';
    volunteer.pf_pj_voluntario =  this.registerForm.get('pf_pj_voluntario')?.value + '';
    console.log(volunteer);
    if (this.registerForm.get('idvoluntario')?.value + '' != 'NaN'){
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
      volunteer.idvoluntario = undefined;
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
