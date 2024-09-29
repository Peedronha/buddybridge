import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Classificacao } from '../../model/classificacao';

@Component({
  selector: 'app-classificacao-list',
  templateUrl: './classificacao-list.component.html',
  styleUrl: './classificacao-list.component.scss'
})
export class ClassificacaoListComponent {
  @Input() classificacoes!: Classificacao[];
  _specificEntity: any = {};
  @Output() add = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  loading: boolean = false;
  displayDeleteDialog: boolean = false;

  onAdd() {
    this.add.emit(true);
  }

  onEdit(idClassificacao: number) {
    this.edit.emit(idClassificacao);
  }

  onDelete(idClassificacao: number) {
    this.remove.emit(idClassificacao);
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
      this.onDelete(this._specificEntity.idClassificacao);
      this._specificEntity = null;
      this.displayDeleteDialog = false;
    }
  }
}
