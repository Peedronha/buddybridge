import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {Volunteer} from "../../../model/volunteer.model";
import {VolunteerService} from "../../../service/volunteer.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-list-volunteer',
  templateUrl: './list-volunteer.component.html',
  styleUrl: './list-volunteer.component.scss'
})
export class ListVolunteerComponent {

  @Input() volunteers!: Volunteer[];
  _specificVolunteer: any = {};
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() editPassword = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);



  editForm = this.fb.group({
    nome_voluntario: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    cpf_voluntario: [''/*, [Validators.required, Validators.pattern(/[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/)]*/],
    cnpj_voluntario: [''/*, [Validators.required, Validators.pattern(/[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/)]*/],
    cargo_voluntario: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    descricao_atividades_voluntario: [''],
    pf_pj_voluntario: [''/*, [Validators.required, Validators.pattern(/[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/)]*/]
  });

  loading: boolean = false;

  showHidden: boolean = false;

  showEdit: boolean = false;

  constructor(private fb: FormBuilder, private messageService: MessageService, private volunteerService: VolunteerService, private router: Router) {

  }


  ngOnInit(): void {
    this.volunteerService.getVolunteers().subscribe((data: Volunteer[]) => {
      console.log(data)
      this.volunteers = data;
    });
  }

  onSearch(event: any) {
    const searchTerm = event.target.value;
  }

  updateEdit(idvoluntario: any){
    this._specificVolunteer = this.volunteers.find(volunteer => volunteer.idvoluntario === idvoluntario) || null;

    this.showHidden = !this.showHidden;
    this.showEdit = !this.showEdit;
    // this.router.navigateByUrl('/edit-volunteer')
  }

  updateState(idvoluntario: any){
    this._specificVolunteer = this.volunteers.find(volunteer => volunteer.idvoluntario === idvoluntario) || null;
    this.showHidden = !this.showHidden;
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


  onAdd() {
    this.add.emit(true);
  }

  onEdit(idUser: any) {
    this.edit.emit(idUser);
  }

  onDelete(idUser: any) {
    this.remove.emit(idUser);
  }

  onEditPassword(idUser: any) {
    this.editPassword.emit(idUser);
  }
}
