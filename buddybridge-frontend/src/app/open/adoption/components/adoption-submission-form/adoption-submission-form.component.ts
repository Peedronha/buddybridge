import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AnimalModel} from "../../../../restrict/base/animal/model/animal.model";
import {AdoptionService} from "../../../../restrict/base/adoption-profile/shared/adoption.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AnimalService} from "../../../../restrict/base/animal/service/animal.service";
import {AdoptionProfileModel} from "../../../../restrict/base/adoption-profile/model/AdoptionProfileModel";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MessagesModule} from "primeng/messages";
import {NgIf} from "@angular/common";
import {RippleModule} from "primeng/ripple";
import {AccountService} from "../../../account/shared/account.service";
import {AdoptionFormModel} from "../../models/AdoptionFormModel";
import {AccountRestrictService} from "../../../../restrict/base/account/shared/account-restrict.service";
import {User} from "../../../account/model/user.model";
import {RadioButtonModule} from "primeng/radiobutton";
import {CurrentDate} from "../../models/CurrentDate";

@Component({
  selector: 'app-adoption-submission-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    MessagesModule,
    NgIf,
    RippleModule,
    RouterLink,
    RadioButtonModule
  ],
  templateUrl: './adoption-submission-form.component.html',
  styleUrl: './adoption-submission-form.component.scss'
})
export class AdoptionSubmissionFormComponent {

  adoptionForm: FormGroup;
  maxDate: string;

  constructor(
    private fb: FormBuilder,
    private adoptionService: AdoptionService,
    private messageService: MessageService,
    private router: ActivatedRoute,
    private route: Router,
    private animalService: AnimalService,
    private viaCepService: AccountService,
    private accountRestrictService: AccountRestrictService,
    private currentDate: CurrentDate,
  ) {

    this.maxDate = this.currentDate.getReducedDate(21);

    this.adoptionForm = this.fb.group({
      id_perfil_adocao:[''],
      id_adocao: [''],
      id_animal: [''],
      nome_adotante: ['', Validators.required],
      data_nascimento: ['', Validators.required],
      CPF: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      data_submissao: [''],
      endereco: ['', Validators.required],
      CEP: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
      numero: ['', Validators.required],
      Complemento: [''],
      Bairro: ['', Validators.required],
      Estado: ['', Validators.required],
      Cidade: ['', Validators.required],
      alergias: ['', Validators.required],
      animais_antes: ['', Validators.required],
      horas_fora: ['', [Validators.required, Validators.min(0)]],
      quintal: ['', Validators.required],
      cuidados_medicos: ['', Validators.required],
      motivo_adocao: ['', Validators.required]
    });

    this.adoptionForm.get('CEP')?.valueChanges.subscribe(cep => {
      if (cep.length === 8) {
        this.viaCepService.getAddress(cep).subscribe(address => {
          this.adoptionForm.patchValue({
            endereco: address.logradouro,
            Bairro: address.bairro,
            Estado: address.uf,
            Cidade: address.localidade,
            Complemento: address.complemento
          });
        });
      }
    });
  }

  ngOnInit(): void {
    const adoption: AdoptionProfileModel = this.router.snapshot.data['perfil_adocao'];

    const perfil: any = localStorage.getItem('idUser');

    this.accountRestrictService.loadById(perfil+'').subscribe((data: User) => {
      this.adoptionForm.setValue({
        nome_adotante: data.nome,
        email: data.login,
        telefone: data.telefone+'',
        id_perfil_adocao: adoption.id_perfil_adocao+'',
        id_adocao: adoption.id_adocao+'',
        id_animal:adoption.id_animal+'',
        data_nascimento: '',
        CPF: '',
        data_submissao: this.currentDate.getCurrentDate(),
        endereco: '',
        CEP: '',
        numero: '',
        Complemento: '',
        Bairro: '',
        Estado: '',
        Cidade: '',
        alergias: '',
        animais_antes: '',
        horas_fora: '',
        quintal: '',
        cuidados_medicos: '',
        motivo_adocao: ''
      })
    });
  }

  submitDetails(): void {
    if (this.adoptionForm.valid) {
      const formModel = this.adoptionForm.value as AdoptionFormModel;
      alert(JSON.stringify(formModel))
        this.adoptionService.registerAdoptionIntention(formModel).subscribe(
          response => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Adoção registrada!' });
            this.adoptionForm.reset();
            this.route.navigateByUrl('/adocao');
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao registrar a adoção.' });
          }
        );
      }
  }
  get id_perfil_adocao() {
    return this.adoptionForm.get('id_perfil_adocao');
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

  get data_nascimento() {
    return this.adoptionForm.get('data_nascimento');
  }

  get CPF() {
    return this.adoptionForm.get('CPF');
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
