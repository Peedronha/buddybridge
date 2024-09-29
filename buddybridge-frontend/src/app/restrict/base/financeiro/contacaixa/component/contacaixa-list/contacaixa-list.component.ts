import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContaCaixa } from '../../model/contacaixa';


@Component({
  selector: 'app-conta-caixa-list',
  templateUrl: './contacaixa-list.component.html',
  styleUrls: ['./contacaixa-list.component.scss']
})
export class ContacaixaListComponent {
  @Input() contasCaixa!: ContaCaixa[];
  _specificEntity: any = {};
  @Output() add = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  loading: boolean = false;
  displayDeleteDialog: boolean = false;

  onAdd() {
    this.add.emit(true);
  }

  onEdit(idContaCaixa: number) {
    this.edit.emit(idContaCaixa);
  }

  onDelete(idContaCaixa: number) {
    this.remove.emit(idContaCaixa);
  }

  showDeleteDialog(entity: any) {
    this._specificEntity = entity;
    this.displayDeleteDialog = true;
  }

  onCancelDelete() {
    this._specificEntity = null;
    this.displayDeleteDialog = false;
  }

  confirmDelete() {
    if (this._specificEntity) {
      this.onDelete(this._specificEntity.idContaCaixa);
      this._specificEntity = null;
      this.displayDeleteDialog = false;
    }
  }
}
