import { Component } from '@angular/core';
import { GrupoAcessoDTO } from '../../model/grupoacessoDTO';
import { GrupoacessoserviceService } from './../../service/grupoacessoservice.service';
import {AccountService} from "../../../../../open/account/shared/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import { AcessoDTO } from '../../model/acessoDTO';

@Component({
  selector: 'app-grupoacesso',
  templateUrl: './grupoacesso.component.html',
  styleUrl: './grupoacesso.component.scss'
})
export class GrupoacessoComponent {
  gruposacesso!: GrupoAcessoDTO[]

  //Fazendo a solicitação de acessos - inicio
  acessos: AcessoDTO[] = [];
  displayModal: boolean = false;
  canEditOng: boolean = false;
  //Fazendo a solicitação de acessos - fim

  constructor(
    private grupoacessoserviceService: GrupoacessoserviceService,
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
    this.grupoacessoserviceService.getAcessosParaTela('Cadastro de Grupos de Acesso').subscribe((acessos: AcessoDTO[]) => {
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
    this.grupoacessoserviceService.getGruposAcesso().subscribe((data: GrupoAcessoDTO[]) => {

      //console.log("grupos" +data)

      this.gruposacesso! = data;
    });
  }

  onAdd() {
    if (this.hasAccess('Cadastrar Grupos de Acesso')) {
      this.router.navigate(['addgrupoacesso'], { relativeTo: this.route });
    } else {
      this.showAccessDeniedModal();
    }
  }

  onEdit(id: any) {
    if (this.hasAccess('Alterar Grupos de Acesso')) {
      this.router.navigate(['editgrupoacesso', id], { relativeTo: this.route });
    } else {
      this.showAccessDeniedModal();
    }

  }

  onRemove(id: any) {
    if (this.hasAccess('Excluir Grupo de Acesso')) {
      this.grupoacessoserviceService.deleteGrupoAcesso(id).subscribe(() =>{
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro excluido com sucesso' });
        window.location.reload();
        this.router.navigateByUrl('/grupoacesso')
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
