import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {NgForOf, NgIf} from "@angular/common";
import {RippleModule} from "primeng/ripple";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {DropdownModule} from "primeng/dropdown";
import {InputTextareaModule} from "primeng/inputtextarea";
import {AdoptionService} from "../../../../../restrict/base/adoption-profile/shared/adoption.service";
import {MessageService} from "primeng/api";
import {AnimalService} from "../../../../../restrict/base/animal/service/animal.service";
import {AccountService} from "../../../../account/shared/account.service";
import {AccountRestrictService} from "../../../../../restrict/base/account/shared/account-restrict.service";
import {
  AdoptionProfileModel,
  AdoptionStatus
} from "../../../../../restrict/base/adoption-profile/model/AdoptionProfileModel";
import {User} from "../../../../account/model/user.model";
import {AdoptionFormModel} from "../../../models/AdoptionFormModel";
import {AdoptionIntention} from "../../../models/AdoptionIntention";
import {RadioButtonModule} from "primeng/radiobutton";

@Component({
  selector: 'app-adoption-update',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    NgIf,
    ReactiveFormsModule,
    RippleModule,
    RouterLink,
    DropdownModule,
    NgForOf,
    InputTextareaModule,
    RadioButtonModule
  ],
  templateUrl: './adoption-update.component.html',
  styleUrl: './adoption-update.component.scss'
})
export class AdoptionUpdateComponent {
  adoptionForm: FormGroup;

  status = AdoptionStatus;

  adoption!: AdoptionIntention;

  selectStatus: { label: string, value: string } | undefined;
  statusOptions = [
    { label: 'Pendente', value: 'PENDING' },
    { label: 'Aprovada', value: 'APPROVED' },
    { label: 'Rejeitada', value: 'REJECTED' },
    { label: 'Finalizada', value: 'COMPLETED' }
  ];
  constructor(
    private fb: FormBuilder,
    private adoptionService: AdoptionService,
    private messageService: MessageService,
    private router: ActivatedRoute,
    private route: Router,
    private animalService: AnimalService,
    private viaCepService: AccountService,
    private accountRestrictService: AccountRestrictService
  ) {
    this.adoptionForm = this.fb.group({
      id_perfil_adocao:[''],
      id_adocao: [''],
      id_animal: [''],
      nome_adotante: ['', Validators.required],
      data_nascimento: ['', Validators.required],
      CPF: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      data_submissao: [''],
      endereco: ['', Validators.required],
      CEP: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
      numero: ['', Validators.required],
      complemento: [''],
      Bairro: ['', Validators.required],
      Estado: ['', Validators.required],
      Cidade: ['', Validators.required],
      alergias: ['', Validators.required],
      animais_antes: ['', Validators.required],
      horas_fora: ['', [Validators.required, Validators.min(0)]],
      quintal: ['', Validators.required],
      cuidados_medicos: ['', Validators.required],
      motivo_adocao: ['', Validators.required],
      observacoes: ['', Validators.required],

    })
  }

  ngOnInit(): void {
    this.adoption = this.router.snapshot.data['adocao'];

    const perfil: any = localStorage.getItem('idUser');

    this.accountRestrictService.loadById(perfil+'').subscribe((data: User) => {
      this.adoptionForm.setValue({
        nome_adotante: data.nome,
        email: data.login,
        telefone: data.telefone+'',
        id_perfil_adocao: this.adoption.id_perfil_adocao+'',
        id_adocao: this.adoption.id_adocao+'',
        id_animal:this.adoption.id_animal+'',
        data_nascimento: '',
        CPF: '',
        CEP: '',
        numero:'',
        complemento:'',
        Bairro: '',
        Estado: '',
        Cidade: '',
        data_submissao: '',
        endereco: '',
        alergias: '',
        animais_antes: '',
        horas_fora: '',
        quintal: '',
        cuidados_medicos: '',
        motivo_adocao: '',
        observacoes:''
      })
    });
  }

  submitDetails(): void {
    if (this.adoptionForm.valid) {
      const formModel = this.adoptionForm.value as AdoptionFormModel;
      alert(JSON.stringify(formModel))
      this.adoptionService.updateAdoptionIntention(formModel).subscribe(
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

   booleanToPortuguese(value: boolean): string {
    return value ? "Sim" : "Não";
  }

  get telefone() {
    return this.adoptionForm.get('telefone');
  }

  get email() {
    return this.adoptionForm.get('email');
  }

  get data_submissao() {
    return this.adoptionForm.get('data_submissao');
  }

  get endereco() {
    return this.adoptionForm.get('endereco');
  }

  get CEP() {
    return this.adoptionForm.get('CEP');
  }

  get numero() {
    return this.adoptionForm.get('numero');
  }

  get Complemento() {
    return this.adoptionForm.get('Complemento');
  }

  get Bairro() {
    return this.adoptionForm.get('Bairro');
  }

  get Estado() {
    return this.adoptionForm.get('Estado');
  }

  get Cidade() {
    return this.adoptionForm.get('Cidade');
  }
}
