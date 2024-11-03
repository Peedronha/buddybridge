import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

import { PagamentoService } from '../../service/pagamento.service';

import { Pagamento } from '../../model/pagamento';
import { Movimentacao } from '../../../movimento/model/movimentacao';
import { ContaCaixa } from '../../../contacaixa/model/contacaixa';
import { MovimentacaoService } from '../../../movimento/service/movimento.service';
import { ContaCaixaService } from '../../../contacaixa/service/contacaixa.service';

@Component({
  selector: 'app-pagamento-form',
  templateUrl: './pagamento-form.component.html',
  styleUrls: ['./pagamento-form.component.scss']
})
export class PagamentoFormComponent implements OnInit {

  movimentacoes: Movimentacao[] = [];
  contasCaixa: ContaCaixa[] = [];

  registerForm = this.fb.group({
    idPagamento: [null as number | null],
    movimentacao: [null as Movimentacao | null, Validators.required],
    dataRecebimento: [new Date(), Validators.required],
    contaCaixa: [null as ContaCaixa | null, Validators.required],
    valorPagamento: [null as number | null, [Validators.required, Validators.min(0)]]
  });

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private movimentacaoService: MovimentacaoService,
    private contaCaixaService: ContaCaixaService,
    private pagamentoService: PagamentoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    // Captura os parâmetros passados na navegação
    this.activatedRoute.queryParams.subscribe(params => {
      const idMovimento = params['idMovimento'];
      const valor = params['valor'];
      const data = params['data'];

      if (idMovimento) {
        // Carrega a movimentação usando o idMovimento
        this.movimentacaoService.getMovimentacaoById(idMovimento).subscribe(
          (movimentacao: Movimentacao) => {
            this.registerForm.patchValue({
              movimentacao: movimentacao, // Preenche com o objeto Movimentacao completo
              valorPagamento: valor ? parseFloat(valor) : movimentacao.valorPendente, // Usa o valor passado ou o valor pendente
              dataRecebimento: data ? new Date(data) : new Date() // Converte a data se existir
            });
          },
          (error) => {
            console.error('Erro ao carregar a movimentação:', error);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível carregar a movimentação.' });
          }
        );
      }
    });

    const pagamento: Pagamento = this.activatedRoute.snapshot.data['pagamento'];

    // Carrega movimentações e contas caixa
    this.movimentacaoService.getMovimentacoesPendentesToRecieve().subscribe(
      (data: Movimentacao[]) => {
        this.movimentacoes = data;
      },
      (error) => {
        console.error('Erro ao carregar movimentações:', error);
      }
    );

    this.contaCaixaService.getAllContasCaixa().subscribe(
      (data: ContaCaixa[]) => {
        this.contasCaixa = data;
      },
      (error) => {
        console.error('Erro ao carregar contas de caixa:', error);
      }
    );

    // Preenche o formulário se houver um pagamento
    if (pagamento && pagamento.idPagamento) {
      this.registerForm.setValue({
        idPagamento: pagamento.idPagamento,
        movimentacao: pagamento.movimentacao || null,
        dataRecebimento: pagamento.dataRecebimento || new Date(),
        contaCaixa: pagamento.contaCaixa || null,
        valorPagamento: pagamento.valorPagamento !== undefined ? pagamento.valorPagamento : null
      });
    }
  }

  submitDetails() {
    if (this.registerForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Formulário inválido!' });
      return;
    }

    const valorStr = this.registerForm.get('valorPagamento')?.value + "" ?? "0,00";
    const valorNumerico = parseFloat(valorStr.replace(",", "."));

    const pagamento: Pagamento = {
      idPagamento: this.registerForm.get('idPagamento')?.value,
      movimentacao: this.registerForm.get('movimentacao')?.value,
      dataRecebimento: this.registerForm.get('dataRecebimento')?.value,
      contaCaixa: this.registerForm.get('contaCaixa')?.value,
      valorPagamento: valorNumerico
    } as Pagamento;

    if (pagamento.idPagamento) {
      this.pagamentoService.updatePagamento(pagamento).subscribe(
        () => this.router.navigate(['pagamento']),
        (error) => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar pagamento!' })
      );
    } else {
      this.pagamentoService.savePagamento(pagamento).subscribe(
        () => this.router.navigate(['pagamento']),
        (error) => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar pagamento!' })
      );
    }
  }
}
