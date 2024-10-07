import { Component } from '@angular/core';
import { PagamentoService } from './../../service/pagamento.service';
import { GrupoacessoserviceService } from './../../../../grupo_acesso/service/grupoacessoservice.service';
import { Pagamento } from '../../model/pagamento';
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AcessoDTO } from '../../../../grupo_acesso/model/acessoDTO';
import { AccountService } from '../../../../../../open/account/shared/account.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrl: './pagamento.component.scss'
})
export class PagamentoComponent {
  pagamentos!: Pagamento[];

  //Fazendo a solicitação de acessos - inicio
  acessos: AcessoDTO[] = [];
  displayModal: boolean = false;
  //Fazendo a solicitação de acessos - fim

  constructor(
    private grupoacessoserviceService: GrupoacessoserviceService,
    private pagamentoService: PagamentoService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.refresh();
  }

  ngOnInit(): void {
    this.accountService.validarSessao();
    this.grupoacessoserviceService.getAcessosParaTela('Cadastro de Movimento de Caixa').subscribe((acessos: AcessoDTO[]) => {
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
    this.pagamentoService.getAllPagamentos().subscribe((data: Pagamento[]) => {
      this.pagamentos = data;
    });
  }

  onAdd() {
    if (this.hasAccess('Cadastrar Movimento de caixa')) {
      this.router.navigate(['addpagamento'], { relativeTo: this.route });
    } else {
      this.showAccessDeniedModal();
    }
  }

  onEdit(id: any) {
    if (this.hasAccess('Alterar Movimento de Caixa')) {
      this.router.navigate(['editpagamento', id], { relativeTo: this.route });
    } else {
      this.showAccessDeniedModal();
    }
  }

  onRemove(id: any) {
    if (this.hasAccess('Excluir Movimento de Caixa')) {
      this.pagamentoService.deletePagamento(id).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro excluído com sucesso' });
        window.location.reload();
        this.router.navigateByUrl('/pagamento');
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
