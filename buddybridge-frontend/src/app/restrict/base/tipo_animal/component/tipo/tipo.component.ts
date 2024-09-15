import { Component } from '@angular/core';
import {Raca} from "../../../raca/model/raca.model";
import {RacaService} from "../../../raca/service/raca.service";
import {AccountService} from "../../../../../open/account/shared/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {Tipo} from "../../model/tipo.model";
import {TipoService} from "../../service/tipo.service";
import { GrupoacessoserviceService } from '../../../grupo_acesso/service/grupoacessoservice.service';
import { AcessoDTO } from '../../../grupo_acesso/model/acessoDTO';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrl: './tipo.component.scss'
})
export class TipoComponent {
  tipos!: Tipo[]

    //Fazendo a solicitação de acessos - inicio
    acessos: AcessoDTO[] = [];
    displayModal: boolean = false;
    canEditOng: boolean = false;
    //Fazendo a solicitação de acessos - fim

  constructor(
    private grupoacessoserviceService: GrupoacessoserviceService, //Fazendo a solicitação de acessos
    private tipoService: TipoService,
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
    this.grupoacessoserviceService.getAcessosParaTela('Cadastro de Tipos de Animais').subscribe((acessos: AcessoDTO[]) => {
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
    this.tipoService.getTipos().subscribe((data: Tipo[]) => {
      this.tipos = data; // Ensure data is of type Tipo[]
    });
  }

  onAdd() {
    if (this.hasAccess('Cadastrar Tipo')) {
      this.router.navigate(['addtipo'], { relativeTo: this.route });
    } else {
      this.showAccessDeniedModal();
    }
  }

  onEdit(idUser: any) {
    if (this.hasAccess('Alterar Tipo')) {
      this.router.navigate(['edittipo', idUser], { relativeTo: this.route });
    } else {
      this.showAccessDeniedModal();
    }
  }

  onRemove(idUser: any) {
    if (this.hasAccess('Excluir Tipo')) {
      this.tipoService.deleteTipo(idUser).subscribe(() =>{
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro excluido com sucesso' });
        window.location.reload();
        this.router.navigateByUrl('/tipos');
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
