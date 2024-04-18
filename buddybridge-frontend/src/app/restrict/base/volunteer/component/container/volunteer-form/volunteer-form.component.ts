import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import { Router, ActivatedRoute } from '@angular/router';
import { Volunteer } from '../../../model/volunteer.model';
import { AccountService } from '../../../../../../open/account/shared/account.service';
import {VolunteerService} from "../../../service/volunteer.service";

@Component({
  selector: 'app-volunteer-form',
  templateUrl: './volunteer-form.component.html',
  styleUrl: './volunteer-form.component.scss'
})
export class VolunteerFormComponent {
  registerForm = this.fb.group({
    idvoluntario: [parseInt(''),],
    nome_voluntario: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    cpf_voluntario: [''],
    cnpj_voluntario: [''],
    cargo_voluntario: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    descricao_atividades_voluntario: [''],
    pf_pj_voluntario: ['']
  })

  volunteer: any = {};

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
    this.volunteer = this.router.snapshot.data['volunteer'];

    console.log(this.volunteer);
    this.registerForm.setValue({
      idvoluntario: this.volunteer.idvoluntario,
      nome_voluntario: this.volunteer.nome_voluntario+'',
      email: this.volunteer.email+'',
      cpf_voluntario: this.volunteer.cpf_voluntario+'',
      cnpj_voluntario: this.volunteer.cnpj_voluntario+'',
      cargo_voluntario: this.volunteer.cargo_voluntario+'',
      descricao_atividades_voluntario: this.volunteer.descricao_atividades_voluntario+'',
      pf_pj_voluntario: this.volunteer.pf_pj_voluntario+'',
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

    const postData = { ...this.registerForm.value };

    if (!this.showPj) {
      postData.pf_pj_voluntario = 'PESSOA JURIDICA';
    }

    var id = this.registerForm.get('idvoluntario')?.value + '';
    postData.idvoluntario = parseInt(id);
    postData.pf_pj_voluntario = 'PESSOA FISICA';
    console.log(this.registerForm.get('idvoluntario')?.value + '');

    if (this.registerForm.get('idvoluntario')?.value + '' != 'NaN'){
      this.volunteerService.updateVolunteer(postData as Volunteer).subscribe(
        response => {
          console.log(response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register successfully' });
          this.registerForm.reset();
          this.route.navigateByUrl('/volunteer')
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
        },
      )
    } else {
      this.volunteerService.registerVolunteer(postData as Volunteer).subscribe(
        response => {
          console.log(response);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Register successfully'});
          this.registerForm.reset();
          this.route.navigateByUrl('/validate-login')
        },
        error => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Something went wrong'});
        },
      )
    }
  }
}
