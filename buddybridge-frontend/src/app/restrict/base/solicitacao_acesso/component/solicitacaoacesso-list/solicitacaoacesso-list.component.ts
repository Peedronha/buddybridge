import { SolicitacaoacessoService } from './../../service/solicitacaoacesso.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Solicitacaoacesso } from '../../model/solicitacaoacesso';

@Component({
  selector: 'app-solicitacaoacesso-list',

  templateUrl: './solicitacaoacesso-list.component.html',
  styleUrl: './solicitacaoacesso-list.component.scss'
})
export class SolicitacaoacessoListComponent {
  @Input() solicitacoesacesso!: Solicitacaoacesso[];
  _specificEntity: any = {};
  @Output() permit = new EventEmitter<number>();
  @Output() denied = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  loading: boolean = false;
  displayDeleteDialog: boolean = false;

  constructor(
    private solicitacaoacessoService: SolicitacaoacessoService,
    ) {}

  ngOnInit(): void {
    this.solicitacaoacessoService.getSolicitacoesAcesso().subscribe((data: Solicitacaoacesso[]) => {
      this.solicitacoesacesso = data;
    });
  }

  onSearch(event: any) {
    const searchTerm = event.target.value;
    // Implement search functionality
  }

  onPermit(idsolicitacaoAcesso: number) {
    this.permit.emit(idsolicitacaoAcesso);
  }

  onDenied(idsolicitacaoAcesso: number) {
    this.denied.emit(idsolicitacaoAcesso);
  }

  onDelete(idsolicitacaoAcesso: number) {
    this.remove.emit(idsolicitacaoAcesso);
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
      this.onDelete(this._specificEntity.idGrupoAcesso);
      this._specificEntity = null;
      this.displayDeleteDialog = false;
    }
  }

}
