import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {VolunteerService} from "../../../service/volunteer.service";
import {Colaborador} from "../../../model/colaborador";



@Component({
  selector: 'app-register-volunteer',
  templateUrl: './register-volunteer.component.html',
  styleUrl: './register-volunteer.component.scss'
})
export class RegisterVolunteerComponent {

  registerForm = this.fb.group({
    nome_colaborador: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
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
    private router: Router
  ) {}
  ngOnInit(): void {
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
    } else {
      this.registerForm.get('cnpj_colaborador')?.setValidators([Validators.required, Validators.pattern(/[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/)]);
      this.registerForm.get('cpf_colaborador')?.clearValidators();
      this.registerForm.get('cpf_colaborador')?.disable();
    }
    this.registerForm.get('cpf_colaborador')?.updateValueAndValidity();
    this.registerForm.get('cnpj_colaborador')?.updateValueAndValidity();
  }

  isPessoaJuridica(): boolean {
    return this.showPj;
  }

  submitDetails() {
    const postData = { ...this.registerForm.value };
    if (!this.showPj) {
      postData.pf_pj_colaborador = 'PESSOA JURIDICA';
    }
      postData.pf_pj_colaborador = 'PESSOA FISICA'
    this.volunteerService.registerVolunteer(postData as Colaborador).subscribe(
      response => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register successfully' });

        this.registerForm.get('cnpj_colaborador')?.enable();
        this.registerForm.get('cpf_colaborador')?.enable();

        this.registerForm.reset();
        this.router.navigateByUrl('/volunteer')
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      },
    )
  }

  resetForm() {
    this.registerForm.reset();
  }
}
