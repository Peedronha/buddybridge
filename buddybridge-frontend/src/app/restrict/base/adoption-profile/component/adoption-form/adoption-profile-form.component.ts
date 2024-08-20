import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MessagesModule} from "primeng/messages";
import {NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MessageService} from "primeng/api";
import {AccountService} from "../../../../../open/account/shared/account.service";
import {AdoptionService} from "../../shared/adoption.service";
import {AdoptionProfileModel, AdoptionStatus} from "../../model/AdoptionProfileModel";
import {AnimalService} from "../../../animal/service/animal.service";
import {Tipo} from "../../../tipo_animal/model/tipo.model";
import {AnimalModel} from "../../../animal/model/animal.model";

@Component({
  selector: 'app-adoption-profile-form',
  standalone: true,
  imports: [
    ButtonModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    MessagesModule,
    NgIf,
    PaginatorModule,
    ReactiveFormsModule,
    RippleModule,
    RouterLink
  ],
  templateUrl: './adoption-profile-form.component.html',
  styleUrl: './adoption-profile-form.component.scss'
})
export class AdoptionProfileFormComponent {
  adoptionForm: FormGroup;
  animals: AnimalModel[] = [];
  statusOptions = [
    { label: 'Pendente', value: 'PENDING' },
    { label: 'Aprovada', value: 'APPROVED' },
    { label: 'Rejeitada', value: 'REJECTED' },
    { label: 'Finalizada', value: 'COMPLETED' }
  ];
  selectAnimal: AnimalModel | undefined;
  selectStatus: { label: string, value: string } | undefined;

  constructor(
    private fb: FormBuilder,
    private adoptionService: AdoptionService,
    private messageService: MessageService,
    private router: ActivatedRoute,
    private route: Router,
    private animalService: AnimalService
  ) {
    this.adoptionForm = this.fb.group({
      id_adocao: [''],
      id_animal: ['', Validators.required],
      descricao_experiencia: [''],
      status: ['', Validators.required],
      priority: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      medical_necessities: [''],
      image: [null],
    });
  }

  ngOnInit(): void {
    const adoption: AdoptionProfileModel = this.router.snapshot.data['perfil'];

    this.adoptionForm.setValue({
      id_adocao: adoption.id_adocao,
      id_animal: adoption.id_animal,
      descricao_experiencia: adoption.descricao_experiencia,
      status: adoption.status,
      priority: adoption.priority,
      medical_necessities: adoption.medical_necessities,
      image: adoption.image,
    });

    this.loadDropdownOptions();
  }

  loadDropdownOptions(): void {
    this.animalService.getAnimals().subscribe(animals => {
      this.animals = animals;
    });
  }

  submitDetails(): void {
    if (this.adoptionForm.valid) {
      const adoption = this.adoptionForm.value as AdoptionProfileModel;

      adoption.id_animal = this.selectAnimal?.id_animal?.toString() || '';
      adoption.status = this.selectStatus?.value;

      alert(JSON.stringify(adoption));console.log(JSON.stringify(adoption));
      if (adoption.id_adocao) {
        this.adoptionService.updateAdoptionProfile(adoption).subscribe(
          response => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Adoção atualizada!' });
            this.adoptionForm.reset();
            this.route.navigateByUrl('/perfil-adocao');
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar a adoção.' });
          }
        );
      } else {
        this.adoptionService.registerAdoptionProfile(adoption).subscribe(
          response => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Adoção registrada!' });
            this.adoptionForm.reset();
            this.route.navigateByUrl('/perfil-adocao');
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao registrar a adoção.' });
          }
        );
      }
    }
  }
}
