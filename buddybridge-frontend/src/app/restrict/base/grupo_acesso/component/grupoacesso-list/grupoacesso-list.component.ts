import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { GrupoAcessoDTO } from '../../model/grupoacessoDTO';
import { GrupoacessoserviceService } from '../../service/grupoacessoservice.service';

@Component({
  selector: 'app-grupoacesso-list',
  templateUrl: './grupoacesso-list.component.html',
  styleUrl: './grupoacesso-list.component.scss'
})
export class GrupoacessoListComponent {
  @Input() gruposacesso!: GrupoAcessoDTO[];
  _specificEntity: any = {};
  @Output() add = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();


  loading: boolean = false;
  displayDeleteDialog: boolean = false;

  constructor(
    private messageService: MessageService,
    private grupoAcessoService: GrupoacessoserviceService,
    private router: Router) {}

  ngOnInit(): void {
    this.grupoAcessoService.getGruposAcesso().subscribe((data: GrupoAcessoDTO[]) => {
      this.gruposacesso = data;
    });
  }

  onSearch(event: any) {
    const searchTerm = event.target.value;
    // Implement search functionality
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(idGrupoAcesso: number) {
    this.edit.emit(idGrupoAcesso);
  }

  onDelete(idGrupoAcesso: number) {
    this.remove.emit(idGrupoAcesso);
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
