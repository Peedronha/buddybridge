import { Component } from '@angular/core';
import { User } from '../../../../../../open/account/model/user.model';
import { AccountRestrictService } from '../../../shared/account-restrict.service';
import {MenuItem, MessageService} from "primeng/api";
import { ActivatedRoute, Router } from '@angular/router';
import { AcessoDTO } from '../../../../grupo_acesso/model/acessoDTO';
import { GrupoacessoserviceService } from '../../../../grupo_acesso/service/grupoacessoservice.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  users!: User[];

  //Fazendo a solicitação de acessos - inicio
  acessos: AcessoDTO[] = [];
  displayModal: boolean = false;
  canEditOng: boolean = false;
  //Fazendo a solicitação de acessos - fim

  constructor(
    private accountRestrictService: AccountRestrictService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private grupoacessoservice : GrupoacessoserviceService //Fazendo a solicitação de acessos
  ) {
    this.refresh();
  }

  ngOnInit(): void {
     //Fazendo a solicitação de acessos - inicio
     this.grupoacessoservice.getAcessosParaTela('Cadastro de Usuários').subscribe((acessos: AcessoDTO[]) => {
      this.acessos = acessos;
      console.log(acessos)
      // Verificar se o usuário tem o acesso para editar os dados da ONG
      this.canEditOng = !this.acessos.some(acesso => acesso.descricaoAcesso === 'Cadastrar Dados da Ong');
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
    this.grupoacessoservice.solicitarAcesso(acesso.idAcesso).subscribe(response => {
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
    this.accountRestrictService.listar().subscribe((data: User[]) => {
      this.users! = data;
    });
  }

  onAdd() {
    if (this.hasAccess('Cadastrar Usuário')) {
      this.router.navigate(['addaccount'], { relativeTo: this.route });
    } else {
      this.showAccessDeniedModal();
    }
  }

  onEdit(idUser: any) {
    if (this.hasAccess('Alterar Usuário')) {
      this.router.navigate(['editaccount', idUser], { relativeTo: this.route });
    } else {
      this.showAccessDeniedModal();
    }
  }

  onEditPassword(idUser: any) {
    if (this.hasAccess('Alterar Usuário')) {
      this.router.navigate(['editpassword', idUser], { relativeTo: this.route });
    } else {
      this.showAccessDeniedModal();
    }
  }

  onRemove(idUser: any) {
    if (this.hasAccess('Excluir Usuário')) {
      this.accountRestrictService.deletar(idUser).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registro removido com sucesso' });
        window.location.reload();
        this.router.navigateByUrl('/account')
      });
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
