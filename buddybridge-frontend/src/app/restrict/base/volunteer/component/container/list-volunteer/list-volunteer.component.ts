import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {Colaborador} from "../../../model/colaborador";
import {VolunteerService} from "../../../service/volunteer.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-list-volunteer',
  templateUrl: './list-volunteer.component.html',
  styleUrl: './list-volunteer.component.scss'
})
export class ListVolunteerComponent {

  @Input() colaboradores!: Colaborador[];
  _specificVolunteer: any = {};
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() editPassword = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);



  editForm = this.fb.group({
    nome_colaborador: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    cpf_colaborador: [''/*, [Validators.required, Validators.pattern(/[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/)]*/],
    cnpj_colaborador: [''/*, [Validators.required, Validators.pattern(/[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/)]*/],
    cargo_colaborador: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    descricao_atividades_colaborador: [''],
    pf_pj_colaborador: [''/*, [Validators.required, Validators.pattern(/[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/)]*/]
  });

  loading: boolean = false;

  showHidden: boolean = false;

  showEdit: boolean = false;

  constructor(private fb: FormBuilder, private messageService: MessageService, private volunteerService: VolunteerService, private router: Router) {

  }


  ngOnInit(): void {
    this.volunteerService.getVolunteers().subscribe((data: Colaborador[]) => {
      console.log(data)
      this.colaboradores = data;
    });
  }

  onSearch(event: any) {
    const searchTerm = event.target.value;
  }

  updateEdit(idcolaborador: any){
    this._specificVolunteer = this.colaboradores.find(volunteer => volunteer.idcolaborador === idcolaborador) || null;

    this.showHidden = !this.showHidden;
    this.showEdit = !this.showEdit;
    // this.router.navigateByUrl('/edit-volunteer')
  }

  updateState(idcolaborador: any){
    this._specificVolunteer = this.colaboradores.find(volunteer => volunteer.idcolaborador === idcolaborador) || null;
    this.showHidden = !this.showHidden;
  }


  updateValidator(cnpj: boolean){
    if (cnpj) {
      this.editForm.get('cnpj_colaborador')?.setValidators([Validators.required, Validators.pattern(/[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/)]);
      this.editForm.get('cpf_colaborador')?.clearValidators();
      this.editForm.get('cpf_colaborador')?.disable();
    } else {
      this.editForm.get('cpf_colaborador')?.setValidators([Validators.required, Validators.pattern(/[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/)]);
      this.editForm.get('cnpj_colaborador')?.clearValidators();
      this.editForm.get('cnpj_colaborador')?.disable();
    }
    this.editForm.get('cpf_colaborador')?.updateValueAndValidity();
    this.editForm.get('cnpj_colaborador')?.updateValueAndValidity();
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
