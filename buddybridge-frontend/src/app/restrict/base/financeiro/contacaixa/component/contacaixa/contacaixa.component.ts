import { Component } from '@angular/core';


import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { ContaCaixa } from '../../model/contacaixa';
import { AcessoDTO } from '../../../../grupo_acesso/model/acessoDTO';
import { ContaCaixaService } from '../../service/contacaixa.service';
import { GrupoacessoserviceService } from '../../../../grupo_acesso/service/grupoacessoservice.service';



@Component({
  selector: 'app-conta-caixa',
  templateUrl: './contacaixa.component.html',
  styleUrls: ['./contacaixa.component.scss']
})
export class ContacaixaComponent {
  contasCaixa!: ContaCaixa[];

  //Fazendo a solicitação de acessos
  acessos: AcessoDTO[] = [];
  displayModal: boolean = false;

  constructor(
    private contaCaixaService: ContaCaixaService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private grupoacessoservice : GrupoacessoserviceService
  ) {
    this.refresh();
  }

  ngOnInit(): void {
    this.grupoacessoservice.getAcessosParaTela('Cadastro de Conta Caixa').subscribe((acessos: AcessoDTO[]) => {
      this.acessos = acessos;
    });
  }

  openModal() {
    this.displayModal = true;
  }

  solicitarAcesso(acesso: AcessoDTO) {
    this.grupoacessoservice.solicitarAcesso(acesso.idAcesso).subscribe(response => {
        this.messageService.add({ severity: 'success', summary: 'Solicitação feita com sucesso', detail: 'Aguarde o administrador realizar a liberação do acesso!' });
      },
      error => {
        this.messageService.add({ severity: 'warning', summary: 'Atenção!', detail: 'Este acesso já foi solicitado!' });
      }
    );
  }

  refresh() {
    this.contaCaixaService.getAllContasCaixa().subscribe((data: ContaCaixa[]) => {
      this.contasCaixa = data;
    });
  }

  onAdd() {
    if (this.hasAccess('Cadastrar Conta Caixa')) {
      this.router.navigate(['addcontacaixa'], { relativeTo: this.route });
    } else {
      this.showAccessDeniedModal();
    }
  }

  onEdit(id: any) {
    if (this.hasAccess('Alterar Conta Caixa')) {
      this.router.navigate(['editcontacaixa', id], { relativeTo: this.route });
    } else {
      this.showAccessDeniedModal();
    }
  }

  onRemove(id: any) {
    if (this.hasAccess('Excluir Conta Caixa')) {
      this.contaCaixaService.deleteContaCaixa(id).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro excluído com sucesso' });
        window.location.reload();
        this.router.navigateByUrl('/contacaixa');
      });
    } else {
      this.showAccessDeniedModal();
    }
  }

  private hasAccess(descricaoAcesso: string): boolean {
    return !this.acessos.some(acesso => acesso.descricaoAcesso === descricaoAcesso);
  }

  private showAccessDeniedModal() {
    this.messageService.add({ severity: 'warning', summary: 'Atenção!', detail: 'Você não possui acesso a esta funcionalidade. Solicite acesso para prosseguir.' });
    this.openModal();
  }
}
