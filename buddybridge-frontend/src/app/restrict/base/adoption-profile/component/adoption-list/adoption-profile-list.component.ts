import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService, SharedModule} from "primeng/api";
import {Router} from "@angular/router";
import {AdoptionService} from "../../shared/adoption.service";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {AdoptionProfileModel} from "../../model/AdoptionProfileModel";

@Component({
  selector: 'app-adoption-profile-list',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    InputTextModule,
    RippleModule,
    SharedModule,
    TableModule
  ],
  templateUrl: './adoption-profile-list.component.html',
  styleUrl: './adoption-profile-list.component.scss'
})
export class AdoptionProfileListComponent {
  @Input() profiles!: AdoptionProfileModel[];
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
    this.adoptionService.getAdoptionsProfiles().subscribe((data: AdoptionProfileModel[]) => {
      this.profiles = data;
    });
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(idPerfil: number) {
    this.edit.emit(idPerfil);
  }

  onDelete(idPerfil: number) {
    this.remove.emit(idPerfil);
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
      this.onDelete(this._specificEntity.id_perfil);

      this._specificEntity = null;

      this.displayDeleteDialog = false;
    }
  }
}
