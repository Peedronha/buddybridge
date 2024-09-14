import { SolicitacaoacessoService } from './../../service/solicitacaoacesso.service';
import { MessageService } from 'primeng/api';
import { AccountService } from '../../../../../open/account/shared/account.service';
import { AcessoDTO } from '../../../grupo_acesso/model/acessoDTO';
import { GrupoacessoserviceService } from '../../../grupo_acesso/service/grupoacessoservice.service';
import { Solicitacaoacesso } from './../../model/solicitacaoacesso';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-solicitacaoacesso',
  templateUrl: './solicitacaoacesso.component.html',
  styleUrl: './solicitacaoacesso.component.scss'
})
export class SolicitacaoacessoComponent {
  solicitacoesacesso! : Solicitacaoacesso[]

  //Fazendo a solicitação de acessos - inicio
  acessos: AcessoDTO[] = [];
  displayModal: boolean = false;
  canEditOng: boolean = false;
  //Fazendo a solicitação de acessos - fim

  constructor(
    private grupoacessoserviceService: GrupoacessoserviceService,
    private solicitacaoacessoService: SolicitacaoacessoService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.refresh();
  }

  ngOnInit(): void {
    this.accountService.validarSessao();
    //Fazendo a solicitação de acessos - inicio
    this.grupoacessoserviceService.getAcessosParaTela('Solicitações de Acesso').subscribe((acessos: AcessoDTO[]) => {
     this.acessos = acessos;
     console.log(acessos)
   });
   //Fazendo a solicitação de acessos - fim
  }

  //Fazendo a solicitação de acessos - inicio
  openModal() {
    this.displayModal = true;
  }
  //Fazendo a solicitação de acessos - fim

  //Fazendo a solicitação de acessos - inicio
  solicitarAcesso(acesso: AcessoDTO) {
    // Aqui você pode implementar a lógica para solicitar o acesso
    console.log(`Solicitar acesso: ${acesso.descricaoAcesso}`);
    this.grupoacessoserviceService.solicitarAcesso(acesso.idAcesso).subscribe(response => {
        console.log('Acesso solicitado com sucesso');
        this.messageService.add({ severity: 'success', summary: 'Solicitação de acesso feita com sucesso', detail: 'Aguarde o administrador realizar a liberação do acesso!' });
      },
      error => {
        this.messageService.add({ severity: 'warning', summary: 'Atenção!', detail: 'Este acesso já foi solicitado! Aguarde o administrador realizar a liberação do acesso!' });
      }
    );
  }
  //Fazendo a solicitação de acessos - fim

  refresh() {
    this.solicitacaoacessoService.getSolicitacoesAcesso().subscribe((data: Solicitacaoacesso[]) => {
      this.solicitacoesacesso! = data;
    });
  }

  onPermit(id: any) {
    if (this.hasAccess('Liberar/Negar Acesso')) {
      this.solicitacaoacessoService.enableDisableAcesso(id).subscribe(() =>{
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro alterado com sucesso' });
        window.location.reload();
        this.refresh();
        this.router.navigateByUrl('/solicitacaoacesso')
      })
    } else {
      this.showAccessDeniedModal();
    }
  }

  onDenied(id: any) {
    if (this.hasAccess('Liberar/Negar Acesso')) {
      this.solicitacaoacessoService.enableDisableAcesso(id).subscribe(() =>{
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro alterado com sucesso' });
        window.location.reload();
        this.refresh();
        this.router.navigateByUrl('/solicitacaoacesso')
      })
    } else {
      this.showAccessDeniedModal();
    }

  }

  onRemove(id: any) {
    if (this.hasAccess('Excluir solicitação de Acesso')) {
      this.solicitacaoacessoService.deleteSolicitacaoAcesso(id).subscribe(() =>{
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro excluido com sucesso' });
        window.location.reload();
        this.refresh();
        this.router.navigateByUrl('/solicitacaoacesso')
      })
    } else {
      this.showAccessDeniedModal();
    }
  }

  // Método para verificar o acesso
  private hasAccess(descricaoAcesso: string): boolean {
    return !this.acessos.some(acesso => acesso.descricaoAcesso === descricaoAcesso);
  }

  // Exibir o modal de acesso negado
  private showAccessDeniedModal() {
    this.messageService.add({ severity: 'warning', summary: 'Atenção!', detail: 'Você não possui acesso a esta funcionalidade. Solicite acesso para prosseguir.' });
    this.openModal();
  }


}
