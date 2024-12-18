import {Component, OnInit} from '@angular/core';
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
import {Subscription} from "rxjs";
import {ImageUploadService} from "../../shared/image-upload.service";

enum ImageFileTypes {
  PNG = 'image/png',
  JPG = 'image/jpeg',
  SVG = 'image/svg+xml',
  TIFF = 'image/tiff',
  WEBP = 'image/webp'
}
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

export class AdoptionProfileFormComponent implements OnInit {
  adoptionForm: FormGroup;
  animals: AnimalModel[] = [];
  selectAnimal!: AnimalModel;
  statusOptions = [
    { label: 'Pendente', value: 'PENDING' },
    { label: 'Aprovada', value: 'APPROVED' },
    { label: 'Rejeitada', value: 'REJECTED' },
    { label: 'Finalizada', value: 'COMPLETED' }
  ];
  selectStatus: { label: string, value: string } | undefined;

  imagePreview: string | ArrayBuffer | null = null; // Stores the image preview URL
  selectedFile: File | null = null; // Stores the file to send on submission


  // Image upload properties
  imageFile!: File;
  subscription!: Subscription;
  imageStatus: 'Loading' | 'Uploaded' | 'Upload' | undefined;
  imageURL: string | undefined;

  constructor(
    private fb: FormBuilder,
    private adoptionService: AdoptionService,
    private messageService: MessageService,
    private router: ActivatedRoute,
    private route: Router,
    private animalService: AnimalService,
    private imageUploadService: ImageUploadService // Inject your image upload service
  ) {
    this.adoptionForm = this.fb.group({
      id_perfil_adocao: [''],
      id_adocao:[''],
      id_animal: ['', Validators.required],
      medical_necessities:[''],
      status_adocao: [''],
      priority: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      image: [null],
      data_criacao: ['']
    });
  }

  ngOnInit(): void {
    const adoption: AdoptionProfileModel = this.router.snapshot.data['perfil'];
    this.adoptionForm.setValue({
      id_perfil_adocao: adoption.id_perfil_adocao,
      id_adocao: adoption.id_adocao,
      id_animal: adoption.id_animal,
      status_adocao: '',
      medical_necessities: adoption.medical_necessities,
      data_criacao: adoption.data_criacao,
      priority: adoption.priority,
      image: adoption.image,
    });
    if (adoption.id_animal != null) {
      this.animalService.getAnimalsById(adoption.id_animal).subscribe(data => {
        this.selectAnimal = data;
      });
    }
    this.loadDropdownOptions();
  }

  loadDropdownOptions(): void {
    this.animalService.getAnimals().subscribe(animals => {
      this.animals = animals;
    });
  }

  onFileInput(event: any) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.imageFile = input.files[0];

      // Create a URL for the image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Stores the preview URL
      };
      reader.readAsDataURL(this.imageFile); // Reads file data as URL
    }
  }

  uploadFile = () => {
    const types = Object.values(ImageFileTypes);

    if (types.includes(this.imageFile.type as string as ImageFileTypes)) {
      const img = new Image();
      const url = window.URL || window.webkitURL;

      img.onload = () => this.putImage();

      img.src = url.createObjectURL(this.imageFile);
    }
  }

  fileDropped(file: File) {
    this.imageFile = file;
    this.uploadFile();
  }

  putImage = () => {
    const upload$ = this.imageUploadService.addImage(this.imageFile, this.selectAnimal.id_animal);
    this.imageStatus = 'Loading';
    this.subscription = upload$.subscribe({
      next: data => {
        this.imageURL = Object.values(data)[4];
        this.imageStatus = 'Uploaded';
        this.adoptionForm.patchValue({ image: this.imageURL });
      },
      error: () => {
        this.imageStatus = 'Upload';
      }
    });
  }


  submitDetails(): void {
    if (this.adoptionForm.valid) {
      const adoption = this.adoptionForm.value as AdoptionProfileModel;

      let aux = JSON.parse(JSON.stringify(this.selectAnimal));
      adoption.id_animal = aux.id_animal;
      adoption.status_adocao = this.selectStatus?.value;

      if (!adoption.id_perfil_adocao) {
        this.uploadFile();
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
      } else {
        this.uploadFile();
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
      }
    }
  }
  get id_perfil_adocao() {
    return this.adoptionForm.get('id_perfil_adocao');
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


