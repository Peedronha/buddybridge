import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {Raca} from "../../model/raca.model";
import {RacaService} from "../../service/raca.service";

@Component({
  selector: 'app-list-raca',
  templateUrl: './list-raca.component.html',
  styleUrl: './list-raca.component.scss'
})
export class ListRacaComponent {

  @Input() racas!: Raca[];
  _specificEntity: any = {};
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() editPassword = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);


  editForm = this.fb.group({
    id_raca: [''],
    nome_raca: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    id_tipo: ['']
  });


  loading: boolean = false;

  displayDeleteDialog: boolean = false;

  constructor(private fb: FormBuilder, private messageService: MessageService, private racaService: RacaService, private router: Router) {

  }


  ngOnInit(): void {
    this.racaService.getRacas().subscribe((data: Raca[]) => {
      this.racas = data;
    });
  }


  onSearch(event: any) {
    const searchTerm = event.target.value;
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(id_raca: any) {
    this.edit.emit(id_raca);
  }

  onDelete(id_raca: any) {
    this.remove.emit(id_raca);
  }

  showDeleteDialog(entity: Raca) {
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
