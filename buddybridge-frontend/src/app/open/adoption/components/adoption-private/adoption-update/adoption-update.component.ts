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
import {AdoptionAvaliation} from "../../../models/AdoptionAvaliation";

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

  aux: number = 0;

  selectStatus: { label: string; value: string } | undefined;

  statusOptions = [
    { label: 'Pendente', value: 'PENDING' },
    { label: 'Em analise', value: 'ANALYSING' },
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
      id_adocao: ['', Validators.required],
      id_animal: [''],
      nome_adotante: [''],
      data_nascimento: [''],
      CPF: [''],
      telefone: [''],
      email: [''],
      data_submissao: [''],
      endereco: [''],
      CEP: [''],
      numero: [''],
      complemento: [''],
      Bairro: [''],
      Estado: [''],
      Cidade: [''],
      alergias: [''],
      animais_antes: [''],
      horas_fora: [''],
      quintal: [''],
      cuidados_medicos: [''],
      motivo_adocao: [''],
      observacoes: ['',Validators.required],
      status_adocao:['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.adoption = this.router.snapshot.data['adocao'];

    //alert("ngOnInit :" + JSON.stringify(this.adoption))

    const perfil: any = localStorage.getItem('idUser');

    this.aux = this.adoption.id_adocao;

    this.selectStatus = this.statusOptions.find(option => option.value === this.adoption.status_adocao)

    this.accountRestrictService.loadById(perfil+'').subscribe((data: User) => {
      this.adoptionForm.setValue({
        nome_adotante: data.nome,
        email: data.login,
        telefone: data.telefone+'',
        id_perfil_adocao: '',
        id_adocao: this.adoption.id_adocao+'',
        id_animal:'',
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
        observacoes:'',
        status_adocao: this.selectStatus
      })
    });
  }

  submitDetails(): void {
    if (this.adoptionForm.valid) {
      const formModel = this.adoptionForm.value as AdoptionIntention;
      //alert(JSON.stringify(formModel));
      formModel.status_adocao =  this.selectStatus?.value.toString() || '';

      this.adoptionService.updateAdoptionIntention(formModel, this.adoptionForm.get('id_adocao')?.value).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Adoção registrada!' });
          this.adoptionForm.reset();
          this.route.navigateByUrl('/restrict/manage-adoption');
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
