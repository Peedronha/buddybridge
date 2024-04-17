import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {VolunteerService} from "../../../service/volunteer.service";
import {Volunteer} from "../../../model/volunteer.model";

@Component({
  selector: 'app-edit-volunteer',
  templateUrl: './edit-volunteer.component.html',
  styleUrl: './edit-volunteer.component.scss'
})
export class EditVolunteerComponent {
  editForm = this.fb.group({
    nome_voluntario: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    cpf_voluntario: [''],
    cnpj_voluntario: [''],
    cargo_voluntario: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    descricao_atividades_voluntario: [''],
    pf_pj_voluntario: ['']
  });

  _specificVolunteer: any = {};

  constructor(private fb: FormBuilder, private volunteerService: VolunteerService, private messageService: MessageService) {
  }

  confirmUpdate(){
    const postData = { ...this.editForm.value };
    this.volunteerService.updateVolunteer(postData as Volunteer).subscribe(
      response => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register successfully' });

        this.editForm.get('cnpj_voluntario')?.enable();
        this.editForm.get('cpf_voluntario')?.enable();

        this.editForm.reset();
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      },
    )
  }

  updateValidator(cnpj: boolean){
    if (cnpj) {
      this.editForm.get('cnpj_voluntario')?.setValidators([Validators.required, Validators.pattern(/[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/)]);
      this.editForm.get('cpf_voluntario')?.clearValidators();
      this.editForm.get('cpf_voluntario')?.disable();
    } else {
      this.editForm.get('cpf_voluntario')?.setValidators([Validators.required, Validators.pattern(/[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/)]);
      this.editForm.get('cnpj_voluntario')?.clearValidators();
      this.editForm.get('cnpj_voluntario')?.disable();
    }
    this.editForm.get('cpf_voluntario')?.updateValueAndValidity();
    this.editForm.get('cnpj_voluntario')?.updateValueAndValidity();
  }

  isPessoaJuridica(): boolean {
    return this._specificVolunteer.pf_pj_voluntario === 'PESSOA JURIDICA';
  }

  cancel(){

  }

  delete(idvoluntario: any) {

  }
}
