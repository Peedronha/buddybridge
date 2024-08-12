import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AdoptionModel} from "../../model/AdoptionModel";
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService, SharedModule} from "primeng/api";
import {Router} from "@angular/router";
import {AdoptionService} from "../../shared/adoption.service";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";

@Component({
  selector: 'app-adoption-list',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    InputTextModule,
    RippleModule,
    SharedModule,
    TableModule
  ],
  templateUrl: './adoption-list.component.html',
  styleUrl: './adoption-list.component.scss'
})
export class AdoptionListComponent {
  @Input() adoptions!: AdoptionModel[];
  _specificEntity: any = {};
  @Output() add = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  editForm = this.fb.group({
    nome_adotante: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    raca: ['', Validators.required],
    endereco: ['', Validators.required],
    telefone: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(/^\d{1,2000}$/)]],
    descricao_experiencia: ['', Validators.required],
    status_adocao: ['', Validators.required],
    data_submissao: ['', Validators.required],
  });


  loading: boolean = false;
  displayDeleteDialog: boolean = false;

  constructor(private fb: FormBuilder,
              private messageService: MessageService,
              private adoptionService: AdoptionService,
              private router: Router) {}

  ngOnInit(): void {
    this.adoptionService.getAdoptions().subscribe((data: AdoptionModel[]) => {
      this.adoptions = data;
    });
  }
  onAdd() {
    this.add.emit(true);
  }

  onEdit(id_adocao: number) {
    this.edit.emit(id_adocao);
  }

  onDelete(id_adocao: number) {
    this.remove.emit(id_adocao);
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
      this.onDelete(this._specificEntity.id_adocao);

      this._specificEntity = null;

      this.displayDeleteDialog = false;
    }
  }
}
