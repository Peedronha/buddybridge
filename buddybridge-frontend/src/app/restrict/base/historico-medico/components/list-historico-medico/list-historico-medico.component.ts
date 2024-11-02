import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {AnimalModel} from "../../../animal/model/animal.model";
import {FormBuilder, Validators} from "@angular/forms";
import {AnimalService} from "../../../animal/service/animal.service";
import {Router} from "@angular/router";
import {HistoricoMedico} from "../../model/historico-medico";
import {HistoricoMedicoService} from "../../service/historico-medico.service";

@Component({
    selector: 'app-list-historico-medico',
    standalone: true,
    imports: [
        ButtonModule,
        DialogModule,
        InputTextModule,
        RippleModule,
        SharedModule,
        TableModule
    ],
    templateUrl: './list-historico-medico.component.html',
    styleUrl: './list-historico-medico.component.scss'
})
export class ListHistoricoMedicoComponent {

    @Input() medicalReports!: HistoricoMedico[];
    _specificEntity: any = {};
    @Output() add = new EventEmitter<boolean>();
    @Output() edit = new EventEmitter<number>();
    @Output() remove = new EventEmitter<number>();

    editForm = this.fb.group({
        nome_animal: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
        raca: ['', Validators.required],
        idade: ['', Validators.required],
        peso_animal: ['', Validators.required],
        comprimento_animal: ['', [Validators.required, Validators.pattern(/^\d{1,2000}$/)]],
        data_resgate: ['', Validators.required],
    });

    loading: boolean = false;
    displayDeleteDialog: boolean = false;

    constructor(private fb: FormBuilder,
                private messageService: MessageService,
                private historicoMedicoService: HistoricoMedicoService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.historicoMedicoService.getMedicalReport().subscribe((data: HistoricoMedico[]) => {
            this.medicalReports = data;
        });
    }

    onSearch(event: any) {
        const searchTerm = event.target.value;
        // Implement search functionality
    }

    onAdd() {
        this.add.emit(true);
    }

    onEdit(medicalReportId: HistoricoMedico) {
        this.edit.emit(medicalReportId.medicalReportId);
    }

    onDelete(medicalReportId: number) {
        this.remove.emit(medicalReportId);
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
            this.onDelete(this._specificEntity.medicalReportId);

            this._specificEntity = null;

            this.displayDeleteDialog = false;
        }
    }


}
