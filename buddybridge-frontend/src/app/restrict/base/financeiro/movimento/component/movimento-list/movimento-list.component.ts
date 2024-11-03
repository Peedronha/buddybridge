import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movimentacao } from '../../model/movimentacao';
import { Pagamento } from '../../../pagamento/model/pagamento';
import { PagamentoService } from '../../../pagamento/service/pagamento.service';


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

  pagamentosMovimento: Pagamento[] = [];
  displayPagamentosDialog: boolean = false;
  movimentoSelecionado: Movimentacao | null = null;

  constructor(private pagamentoService: PagamentoService) {}

  onAdd() {
    this.add.emit(true);
  }

  onEdit(idmovimento: number) {
    this.edit.emit(idmovimento);
  }

  onNovoFluxoCaixa(movimentacao: Movimentacao) {
    this.movimentoSelecionado = movimentacao;
    this.pagamentoService.getPagamentosPorMovimento(movimentacao.idMovimentacao!).subscribe((pagamentos: Pagamento[]) => {
      this.pagamentosMovimento = pagamentos;
      this.displayPagamentosDialog = true;
    });
  }

  adicionarPagamento() {
    this.displayPagamentosDialog = false;
    this.pay.emit(this.movimentoSelecionado?.idMovimentacao);
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
