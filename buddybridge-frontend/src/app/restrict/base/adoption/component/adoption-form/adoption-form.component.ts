import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MessagesModule} from "primeng/messages";
import {NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MessageService} from "primeng/api";
import {AccountService} from "../../../../../open/account/shared/account.service";
import {AdoptionService} from "../../shared/adoption.service";
import {AdoptionModel} from "../../model/AdoptionModel";

@Component({
  selector: 'app-adoption-form',
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
  templateUrl: './adoption-form.component.html',
  styleUrl: './adoption-form.component.scss'
})
export class AdoptionFormComponent {

  registerForm = this.fb.group({
    id_adocao: [''],
    id_animal: [''],
    nome_adotante: ['', [
      Validators.required,
      Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?: [a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/)
    ]],
    endereco: ['', [
      Validators.required,
      Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?: [a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/)
    ]],
    data_submissao: ['', Validators.required],
    telefone: ['', Validators.required],
    descricao_experiencia: ['', Validators.required],
    status_adocao: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private adoptionService: AdoptionService,
    private messageService: MessageService,
    private router: ActivatedRoute,
    private route: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.accountService.validarSessao();
    const adoption: AdoptionModel = this.router.snapshot.data['adocao'];

    this.registerForm.setValue({
      id_adocao: adoption.id_adocao + '',
      id_animal: adoption.id_animal + '',
      nome_adotante: adoption.nome_adotante + '',
      endereco: adoption.endereco + '',
      telefone: adoption.telefone,
      data_submissao: this.formatDate(adoption.data_submissao),
      descricao_experiencia: adoption.descricao_experiencia + '',
      status_adocao: adoption.status_adocao + '',
    });
  }

  formatDate(dateString: string): string {
    const parts = dateString.split('/');
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return formattedDate;
  }

  submitDetails() {
    let adoption = new AdoptionModel();

    var id = this.registerForm.get('id_adocao')?.value + '';
    adoption.id_adocao = parseInt(id);
    adoption.id_animal = parseInt(this.registerForm.get('id_animal')?.value + '');
    adoption.nome_adotante = this.registerForm.get('nome_adotante')?.value + '';
    adoption.endereco = this.registerForm.get('endereco')?.value + '';
    adoption.telefone = this.registerForm.get('telefone')?.value + '';
    adoption.email = this.registerForm.get('email')?.value + '';
    adoption.descricao_experiencia = this.registerForm.get('descricao_experiencia')?.value + '';
    adoption.data_submissao = this.registerForm.get('data_submissao')?.value + '';

    if (this.registerForm.get('id_adocao')?.value + '' != 'NaN') {
      this.adoptionService.updateAdoption(adoption).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Animal atualizado!' });
          this.registerForm.reset();
          this.route.navigateByUrl('/adocao');
        },
        error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao atualizar o animal'
          });
        }
      );
    } else {
      adoption.id_adocao = undefined;
      this.adoptionService.registerAdoption(adoption).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Animal registrado!' });
          this.registerForm.reset();
          this.route.navigateByUrl('/adocao');
        },
        error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao validar o adoption.'
          });
        }
      );
    }
  }
}
