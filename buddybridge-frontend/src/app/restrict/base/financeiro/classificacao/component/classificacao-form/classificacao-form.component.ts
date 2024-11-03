import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { Router, ActivatedRoute } from '@angular/router';
import { Classificacao } from '../../model/classificacao';
import { ClassificacaoService } from '../../service/classificacao.service';

@Component({
  selector: 'app-classificacao-form',
  templateUrl: './classificacao-form.component.html',
  styleUrls: ['./classificacao-form.component.scss']
})
export class ClassificacaoFormComponent implements OnInit {

  tipos = [
    { label: "Entrada", value: "ENTRADA"},
    { label: "Saída", value: "SAIDA" }
  ];

  registerForm = this.fb.group({
    idClassificacao: [null as number | null],
    descricaoClassificacao: ['', [Validators.required]],
    tipo: ['entrada', Validators.required],
    ativoClassificacao: [true, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private classificacaoService: ClassificacaoService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    const classificacao: Classificacao = this.activatedRoute.snapshot.data['classificacao'];
    if (classificacao.idClassificacao) {
      this.registerForm.setValue({
        idClassificacao: classificacao.idClassificacao,
        descricaoClassificacao: classificacao.descricaoClassificacao || '',
        tipo: classificacao.tipo || 'ENTRADA',
        ativoClassificacao: classificacao.ativoClassificacao ?? true,
      });
    }
  }

  get idClassificacao() {
    return this.registerForm.get('idClassificacao');
  }

  get descricaoClassificacao() {
    return this.registerForm.get('descricaoClassificacao');
  }

  get tipo() {
    return this.registerForm.get('tipo');
  }

  get ativoClassificacao() {
    return this.registerForm.get('ativoClassificacao');
  }

  submitDetails() {

    //alert(this.registerForm.get('tipo')?.value);

    const classificacao: Classificacao = {
      idClassificacao: this.registerForm.get('idClassificacao')?.value,
      descricaoClassificacao: this.registerForm.get('descricaoClassificacao')?.value,
      tipo: this.registerForm.get('tipo')?.value,
      ativoClassificacao: this.registerForm.get('ativoClassificacao')?.value,
    } as Classificacao;

    if (classificacao.idClassificacao) {
      this.classificacaoService.updateClassificacao(classificacao).subscribe(
        response => {
          this.router.navigate(['classificacao']);
        },
        error => {
          this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Erro ao atualizar classificação!' });
        }
      );
    } else {
      this.classificacaoService.saveClassificacao(classificacao).subscribe(
        response => {
          this.router.navigate(['classificacao']);
        },
        error => {
          this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Erro ao criar classificação!' });
        }
      );
    }
  }
}
