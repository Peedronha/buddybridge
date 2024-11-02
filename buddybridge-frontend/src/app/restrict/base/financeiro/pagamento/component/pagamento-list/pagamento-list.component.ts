// pagamento-list.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagamento } from '../../model/pagamento';

@Component({
  selector: 'app-pagamento-list',
  templateUrl: './pagamento-list.component.html',
  styleUrls: ['./pagamento-list.component.scss']
})
export class PagamentoListComponent {
  @Input() pagamentos!: Pagamento[];
  _specificEntity: any = {};
  @Output() add = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  loading: boolean = false;
  displayDeleteDialog: boolean = false;

  onAdd() {
    this.add.emit(true);
  }

  onEdit(idPagamento: number) {
    this.edit.emit(idPagamento);
  }

  onDelete(idPagamento: number) {
    this.remove.emit(idPagamento);
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
      this.onDelete(this._specificEntity.idPagamento);
      this._specificEntity = null;
      this.displayDeleteDialog = false;
    }
  }
}
