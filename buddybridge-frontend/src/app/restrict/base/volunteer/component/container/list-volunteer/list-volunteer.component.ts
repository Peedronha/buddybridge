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
  _specificEntity: any = {};
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  loading: boolean = false;
  showHidden: boolean = false;
  showEdit: boolean = false;
  displayDeleteDialog: boolean = false
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private volunteerService: VolunteerService,
    private router: Router) {
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
    this._specificEntity = this.colaboradores.find(volunteer => volunteer.idcolaborador === idcolaborador) || null;
    this.showHidden = !this.showHidden;
    this.showEdit = !this.showEdit;
  }

  updateState(idcolaborador: any){
    this._specificEntity = this.colaboradores.find(volunteer => volunteer.idcolaborador === idcolaborador) || null;
    this.showHidden = !this.showHidden;
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

  showDeleteDialog(entity: Colaborador) {
    this._specificEntity = entity;
    this.displayDeleteDialog = true;
  }

  onCancelDelete() {
    this._specificEntity = null;
    this.displayDeleteDialog = false;
  }

  confirmDelete() {
    if (this._specificEntity) {
      this.onDelete(this._specificEntity.idcolaborador);

      this._specificEntity = null;

      this.displayDeleteDialog = false;

    }
  }
}
