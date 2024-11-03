import { MovimentacaoService } from './../../service/movimento.service';
import { GrupoacessoserviceService } from './../../../../grupo_acesso/service/grupoacessoservice.service';
import { Component } from '@angular/core';
import { Movimentacao } from '../../model/movimentacao';
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AcessoDTO } from '../../../../grupo_acesso/model/acessoDTO';
import { AccountService } from '../../../../../../open/account/shared/account.service';


@Component({
  selector: 'app-movimentacao',
  templateUrl: './movimento.component.html',
  styleUrl: './movimento.component.scss'
})
export class MovimentoComponent {
  movimentacoes!: Movimentacao[];

  //Fazendo a solicitação de acessos - inicio
  acessos: AcessoDTO[] = [];
  displayModal: boolean = false;
  //Fazendo a solicitação de acessos - fim


  constructor(
    private grupoacessoserviceService: GrupoacessoserviceService,
    private movimentacaoService: MovimentacaoService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.refresh();
  }

  ngOnInit(): void {
    this.accountService.validarSessao();
    this.grupoacessoserviceService.getAcessosParaTela('Cadastro de Movimentações').subscribe((acessos: AcessoDTO[]) => {
      this.acessos = acessos;
     });
  }

  openModal() {
    this.displayModal = true;
  }

  solicitarAcesso(acesso: AcessoDTO) {
    this.grupoacessoserviceService.solicitarAcesso(acesso.idAcesso).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Solicitação feita com sucesso', detail: 'Aguarde o administrador' });
      },
      error => {
        this.messageService.add({ severity: 'warning', summary: 'Atenção!', detail: 'Acesso já solicitado!' });
      }
    );
  }

  refresh() {
    this.movimentacaoService.getAllMovimentacoes().subscribe((data: Movimentacao[]) => {
      this.movimentacoes = data;
    });
  }

  onAdd() {
    if (this.hasAccess('Cadastrar Movimentação')) {
      this.router.navigate(['addmovimentacao'], { relativeTo: this.route });
    } else {
      this.showAccessDeniedModal();
    }
  }

  onEdit(id: any) {
    if (this.hasAccess('Alterar Movimentação')) {
      this.router.navigate(['editmovimentacao', id], { relativeTo: this.route });
    } else {
      this.showAccessDeniedModal();
    }
  }

  onPay(id: any) {
    if (this.hasAccess('Pagar Movimentação')) {
      // Obtenha a movimentação selecionada por meio de uma chamada assíncrona
      this.movimentacaoService.getMovimentacaoById(id).subscribe(
        (movimentoSelecionado: Movimentacao) => {
          const valorPendente = movimentoSelecionado.valorPendente;
          const dataRecebimento = new Date(); // data atual

          // Navegue para a tela de novo pagamento com os parâmetros necessários
          this.router.navigate(['pagamento/addpagamento'], {
            queryParams: {
              idMovimento: movimentoSelecionado.idMovimentacao,
              valor: valorPendente,
              data: dataRecebimento.toISOString() // Formata a data para ISO
            }
          });
        },
        (error) => {
          // Manipule o erro, ex: mensagem de erro ao usuário
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível carregar a movimentação.' });
        }
      );
    } else {
      this.showAccessDeniedModal();
    }
  }




  onRemove(id: any) {
    if (this.hasAccess('Excluir Movimentação')) {
      this.movimentacaoService.deleteMovimentacao(id).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro excluído com sucesso' });
        window.location.reload();
        this.router.navigateByUrl('/movimentacao');
      });
    } else {
      this.showAccessDeniedModal();
    }
  }

  private hasAccess(descricaoAcesso: string): boolean {
    return !this.acessos.some(acesso => acesso.descricaoAcesso === descricaoAcesso);
  }

  private showAccessDeniedModal() {
    this.messageService.add({ severity: 'warning', summary: 'Atenção!', detail: 'Você não possui acesso a esta funcionalidade.' });
    this.openModal();
  }
}
