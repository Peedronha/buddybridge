import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../../../open/account/model/user.model';
import {Tipo} from "../../../tipo_animal/model/tipo.model";

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.scss'
})
export class AccountListComponent {

  @Input() users!: User[];
  _specificEntity: any = {} ;
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() editPassword = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);


  constructor() { }
  displayDeleteDialog: boolean = false;

  ngOnInit(): void { }

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
  showDeleteDialog(entity: User) {
    this._specificEntity = entity;
    this.displayDeleteDialog = true;
  }

  onCancelDelete() {
    this._specificEntity = null;
    this.displayDeleteDialog = false;
  }

  confirmDelete() {
    if (this._specificEntity) {
      this.onDelete(this._specificEntity.id);

      this._specificEntity = null;

      this.displayDeleteDialog = false;

    }
  }
}
