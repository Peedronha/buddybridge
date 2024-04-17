import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import { Router, ActivatedRoute } from '@angular/router';
import { Volunteer } from '../../../model/volunteer.model';
import { VolunteerService } from '../../../shared/volunteer.service';
import { AccountService } from '../../../../../../open/account/shared/account.service';

@Component({
  selector: 'app-volunteer-form',
  templateUrl: './volunteer-form.component.html',
  styleUrl: './volunteer-form.component.scss'
})
export class VolunteerFormComponent {
  registerForm = this.fb.group({
    idvoluntario: [parseInt(''),],
    nome_voluntario: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email_voluntario: ['', [Validators.required, Validators.email]],
    cpf_voluntario: [''/*, [Validators.required, Validators.pattern(/[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/)]*/],
    cnpj_voluntario: [''/*, [Validators.required, Validators.pattern(/[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/)]*/],
    cargo_voluntario: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    descricao_atividades_voluntario: [''],
    pf_pj_voluntario: [''/*, [Validators.required, Validators.pattern(/[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/)]*/]
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
    const volunteer: Volunteer = this.router.snapshot.data['volunteer']
    console.log(volunteer);
    this.registerForm.setValue({
      idvoluntario: volunteer.idvoluntario,
      nome_voluntario: volunteer.nome_voluntario+'',
      email_voluntario: volunteer.email_voluntario+'',
      cpf_voluntario: volunteer.cpf_voluntario+'',
      cnpj_voluntario: volunteer.cnpj_voluntario+'',
      cargo_voluntario: volunteer.cargo_voluntario+'',
      descricao_atividades_voluntario: volunteer.descricao_atividades_voluntario+'',
      pf_pj_voluntario: volunteer.pf_pj_voluntario+'',
    })
  }


  get idvoluntario() {
    return this.registerForm.get('idvoluntario');
  }

  get nome_voluntario() {
    return this.registerForm.get('nome_voluntario');
  }

  get email_voluntario() {
    return this.registerForm.get('email_voluntario');
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

  updateState(){
    this.showPj = !this.showPj;
  }

  submitDetails() {
    const postData = { ...this.registerForm.value };
    if (!this.showPj) {
      postData.pf_pj_voluntario = 'Pessoa Juridica';
    }
    var id = this.registerForm.get('id')?.value + '';
    postData.idvoluntario = parseInt(id);
    postData.pf_pj_voluntario = 'Pessoa Fisica'
    this.volunteerService.registerVolunteer(postData as Volunteer).subscribe(
      response => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register successfully' });
        this.registerForm.reset();
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      },
    )
  }
}
