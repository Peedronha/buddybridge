import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Volunteer} from "../../model/volunteer.model";
import {VolunteerService} from "../service/volunteer.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-edit-volunteer',
  templateUrl: './edit-volunteer.component.html',
  styleUrl: './edit-volunteer.component.scss'
})
export class EditVolunteerComponent {
  editForm = this.fb.group({
    nome_voluntario: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    cpf_voluntario: [''/*, [Validators.required, Validators.pattern(/[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/)]*/],
    cnpj_voluntario: [''/*, [Validators.required, Validators.pattern(/[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/)]*/],
    cargo_voluntario: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    descricao_atividades_voluntario: [''],
    pf_pj_voluntario: [''/*, [Validators.required, Validators.pattern(/[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/)]*/]
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
        this.editForm.reset();
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      },
    )
  }

  cancel(){

  }
}
