import { Component } from '@angular/core';
import {AccountService} from "../../../../../open/account/shared/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {Raca} from "../../model/raca.model";
import {RacaService} from "../../service/raca.service";
import { AcessoDTO } from '../../../grupo_acesso/model/acessoDTO';
import { GrupoacessoserviceService } from '../../../grupo_acesso/service/grupoacessoservice.service';

@Component({
  selector: 'app-raca',
  templateUrl: './raca.component.html',
  styleUrl: './raca.component.scss'
})
export class RacaComponent {
  racas!: Raca[]

  //Fazendo a solicitação de acessos - inicio
  acessos: AcessoDTO[] = [];
  displayModal: boolean = false;
  canEditOng: boolean = false;
  //Fazendo a solicitação de acessos - fim

  constructor(
    private grupoacessoserviceService: GrupoacessoserviceService, //Fazendo a solicitação de acessos
    private racaService: RacaService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.refresh();
  }

  ngOnInit(): void { this.accountService.validarSessao(); }

  refresh() {
    this.racaService.getRacas().subscribe((data: Raca[]) => {
      this.racas! = data;
    });
    //Fazendo a solicitação de acessos - inicio
    this.grupoacessoserviceService.getAcessosParaTela('Cadastro de Raça').subscribe((acessos: AcessoDTO[]) => {
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

  onAdd() {
    if (this.hasAccess('Cadastrar Raça')) {
      this.router.navigate(['addraca'], { relativeTo: this.route });
    } else {
      this.showAccessDeniedModal();
    }
  }

  onEdit(idUser: any) {
    if (this.hasAccess('Alterar Raça')) {
      this.router.navigate(['editraca', idUser], { relativeTo: this.route });
    } else {
      this.showAccessDeniedModal();
    }
  }

  onRemove(idUser: any) {
    if (this.hasAccess('Excluir Raça')) {
      this.racaService.deleteRaca(idUser).subscribe(() =>{
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro excluido com sucesso' });
        window.location.reload();
        this.router.navigateByUrl('/racas')
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
