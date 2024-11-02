import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movimentacao } from '../../model/movimentacao';


@Component({
  selector: 'app-movimento-list',
  templateUrl: './movimento-list.component.html',
  styleUrl: './movimento-list.component.scss'
})
export class MovimentoListComponent {
  @Input() movimentacoes!: Movimentacao[];
  _specificEntity: any = {};
  @Output() add = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
  @Output() pay = new EventEmitter<number>();

  loading: boolean = false;
  displayDeleteDialog: boolean = false;

  onAdd() {
    this.add.emit(true);
  }

  onEdit(idmovimento: number) {
    this.edit.emit(idmovimento);
  }

  onPay(idmovimento: number) {
    this.pay.emit(idmovimento);
  }

  onDelete(idmovimento: number) {
    this.remove.emit(idmovimento);
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
      this.onDelete(this._specificEntity.idmovimento);
      this._specificEntity = null;
      this.displayDeleteDialog = false;
    }
  }
}
