import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { Router, ActivatedRoute } from '@angular/router';
import { Movimentacao } from '../../model/movimentacao';
import { ClassificacaoService } from '../../../classificacao/service/classificacao.service';
import { MovimentacaoService } from '../../service/movimento.service';
import { Classificacao } from '../../../classificacao/model/classificacao';


@Component({
  selector: 'app-movimentacao-form',
  templateUrl: './movimento-form.component.html',
  styleUrls: ['./movimento-form.component.scss']
})
export class MovimentoFormComponent implements OnInit {

  classificacoes: Classificacao[] = [];

  registerForm = this.fb.group({
    idMovimentacao: [null as number | null],
    historico: ['', [Validators.required]],
    dataLancamento: [new Date(), Validators.required],
    classificacao: [null as Classificacao | null, Validators.required],
    valor: [null as number | null, Validators.required],
    observacoes: ['']
  });

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private classificacaoService: ClassificacaoService,
    private movimentacaoService: MovimentacaoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const movimentacao: Movimentacao = this.activatedRoute.snapshot.data['movimentacao'];

    this.classificacaoService.getAllClassificacoes().subscribe(
      (data: Classificacao[]) => {
        this.classificacoes = data;
      },
      (error) => {
        console.error('Erro ao carregar classificações:', error);
      }
    );

    if (movimentacao && movimentacao.idMovimentacao) {
      this.registerForm.setValue({
        idMovimentacao: movimentacao.idMovimentacao,
        historico: movimentacao.historico || '',
        dataLancamento: movimentacao.dataLancamento || new Date(),
        classificacao: movimentacao.classificacao || null,
        valor: movimentacao.valor !== undefined ? movimentacao.valor : null,
        observacoes: movimentacao.observacoes || ''
      });
    }
  }

  get historico() {
    return this.registerForm.get('historico');
  }

  get dataLancamento() {
    return this.registerForm.get('dataLancamento');
  }

  get classificacao() {
    return this.registerForm.get('classificacao');
  }

  get valor() {
    return this.registerForm.get('valor');
  }

  get observacoes() {
    return this.registerForm.get('observacoes');
  }

  submitDetails() {

    const valor = this.registerForm.get('valor')?.value + "" ?? "0,00";

    // Substitui a vírgula por ponto e converte para número flutuante.
    const valorNumerico = parseFloat(valor.replace(",", "."));

    const movimentacao: Movimentacao = {
      idMovimentacao: this.registerForm.get('idMovimentacao')?.value,
      historico: this.registerForm.get('historico')?.value,
      dataLancamento: this.registerForm.get('dataLancamento')?.value,
      classificacao: this.registerForm.get('classificacao')?.value,
      valor: valorNumerico,
      observacoes: this.registerForm.get('observacoes')?.value,
      valorPendente: valorNumerico,  // Substitui vírgula por ponto e converte para float
    } as Movimentacao;

    if (movimentacao.idMovimentacao) {
      this.movimentacaoService.updateMovimentacao(movimentacao).subscribe(
        response => {
          this.router.navigate(['movimentacao']);
        },
        error => {
          this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Erro ao atualizar movimentação!' });
        }
      );
    } else {
      this.movimentacaoService.saveMovimentacao(movimentacao).subscribe(
        response => {
          this.router.navigate(['movimentacao']);
        },
        error => {
          this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Erro ao criar movimentação!' });
        }
      );
    }
  }
}
