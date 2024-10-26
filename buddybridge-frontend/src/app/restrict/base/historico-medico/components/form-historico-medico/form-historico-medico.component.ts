import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {MessagesModule} from "primeng/messages";
import {NgForOf, NgIf} from "@angular/common";
import {RippleModule} from "primeng/ripple";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Raca} from "../../../raca/model/raca.model";
import {Tipo} from "../../../tipo_animal/model/tipo.model";
import {AnimalService} from "../../../animal/service/animal.service";
import {TipoService} from "../../../tipo_animal/service/tipo.service";
import {RacaService} from "../../../raca/service/raca.service";
import {MessageService} from "primeng/api";
import {AccountService} from "../../../../../open/account/shared/account.service";
import {AnimalModel} from "../../../animal/model/animal.model";
import {CurrentDate} from "../../../../../open/adoption/models/CurrentDate";
import {HistoricoMedico} from "../../model/historico-medico";
import {HistoricoMedicoService} from "../../service/historico-medico.service";

@Component({
  selector: 'app-form-historico-medico',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    MessagesModule,
    NgForOf,
    NgIf,
    RippleModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './form-historico-medico.component.html',
  styleUrl: './form-historico-medico.component.scss'
})
export class FormHistoricoMedicoComponent {

  registerForm = this.fb.group({
    medicalReportId: [''],
    animalId: ['', [Validators.required,]],
    doctor: ['', Validators.required],
    type: ['', Validators.required],
    description: ['', Validators.required],
    date: ['', Validators.required],
    returnDate: [''],
  });
  protected maxDate: string;
  animals: AnimalModel[] = [];
  selectAnimal!: AnimalModel[];

  constructor(
    private fb: FormBuilder,
    private historicoMedicoService : HistoricoMedicoService,
    private messageService: MessageService,
    private router: ActivatedRoute,
    private route: Router,
    private accountService: AccountService,
    private CurrentDate: CurrentDate,
    private animalService: AnimalService
  ) {
    this.maxDate = CurrentDate.getCurrentDate();
  }

  ngOnInit(): void {
    this.accountService.validarSessao();
    const medicalReport: HistoricoMedico = this.router.snapshot.data['medicalReport']

    this.animalService.getAnimals().subscribe(animals => {
      this.animals = animals;
    });

    this.registerForm.setValue({
      medicalReportId: medicalReport.id + '',
      animalId: medicalReport.animalId + '',
      doctor: medicalReport.doctor + '',
      type: medicalReport.type + '',
      description: medicalReport.description+ '',
      date: medicalReport.date+'',
      returnDate: medicalReport.returnDate + '',
    });
  }
  formatDate(dateString: string): string {
    const parts = dateString.split('/');
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return formattedDate;
  }
  submitDetails() {
    let medicalReport = new HistoricoMedico();


    let aux = JSON.parse(JSON.stringify(this.selectAnimal))
    medicalReport.animalId = aux.id_animal

    var id = this.registerForm.get('medicalReportId')?.value + '';
    medicalReport.id = parseInt(id);
    // medicalReport.animalId = parseInt(this.registerForm.get('animalId')?.value + '');
    medicalReport.doctor = this.registerForm.get('doctor')?.value + '';
    medicalReport.date = this.registerForm.get('date')?.value + '';
    medicalReport.notes = this.registerForm.get('notes')?.value + '';
    medicalReport.description = this.registerForm.get('description')?.value + '';
    medicalReport.returnDate = this.registerForm.get('returnDate')?.value + '';
    medicalReport.type = this.registerForm.get('type')?.value + '';

    if (this.registerForm.get('id')?.value + '' != 'NaN') {
      this.historicoMedicoService.updateMedical(medicalReport).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro Médico atualizado!' });
          this.registerForm.reset();
          this.route.navigateByUrl('/report');
        },
        error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao atualizar o registro médico'
          });
        }
      );
    } else {
      medicalReport.id = undefined;
      this.historicoMedicoService.registerMedicalReport(medicalReport).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro Médico registrado!' });
          this.registerForm.reset();
          this.route.navigateByUrl('/report');
        },
        error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao validar o animal.'
          });
        }
      );
    }
  }

  get medicalReportId() {
    return this.registerForm.get('medicalReportId');
  }
}
