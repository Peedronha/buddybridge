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
import {AdoptionService} from "../../shared/adoption.service";
import {AdoptionProfileModel, AdoptionStatus} from "../../model/AdoptionProfileModel";
import {AnimalService} from "../../../animal/service/animal.service";
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
      status_adocao: ['', Validators.required],
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
      status_adocao: adoption.status_adocao,
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
      adoption.status_adocao = this.selectStatus?.value;
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
  get id_adocao() {
    return this.adoptionForm.get('id_adocao');
  }

  get id_animal() {
    return this.adoptionForm.get('id_animal');
  }

  get nome_adotante() {
    return this.adoptionForm.get('nome_adotante');
  }

  get endereco() {
    return this.adoptionForm.get('endereco');
  }

  get telefone() {
    return this.adoptionForm.get('telefone');
  }

  get email() {
    return this.adoptionForm.get('email');
  }

  get descricao_experiencia() {
    return this.adoptionForm.get('descricao_experiencia');
  }

  get status_adocao() {
    return this.adoptionForm.get('status_adocao');
  }

  get data_submissao() {
    return this.adoptionForm.get('data_submissao');
  }

  get priority() {
    return this.adoptionForm.get('priority');
  }

  get medical_necessities() {
    return this.adoptionForm.get('medical_necessities');
  }

  get image() {
    return this.adoptionForm.get('image');
  }

  get peso_animal() {
    return this.adoptionForm.get('peso_animal');
  }
}


