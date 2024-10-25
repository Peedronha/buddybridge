import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {MessagesModule} from "primeng/messages";
import {NgForOf, NgIf} from "@angular/common";
import {RippleModule} from "primeng/ripple";
import {ListHistoricoMedicoComponent} from "../list-historico-medico/list-historico-medico.component";
import {AnimalModel} from "../../../animal/model/animal.model";
import {AcessoDTO} from "../../../grupo_acesso/model/acessoDTO";
import {GrupoacessoserviceService} from "../../../grupo_acesso/service/grupoacessoservice.service";
import {AnimalService} from "../../../animal/service/animal.service";
import {AccountService} from "../../../../../open/account/shared/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-historico-medico',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    MessagesModule,
    NgForOf,
    NgIf,
    RippleModule,
    ListHistoricoMedicoComponent
  ],
  templateUrl: './historico-medico.component.html',
  styleUrl: './historico-medico.component.scss'
})
export class HistoricoMedicoComponent {
  animals!: AnimalModel[]

  medical_report: any;

  //Fazendo a solicitação de acessos - inicio
  acessos: AcessoDTO[] = [];
  displayModal: boolean = false;
  canEditOng: boolean = false;
  //Fazendo a solicitação de acessos - fim

  constructor(
    private grupoacessoserviceService: GrupoacessoserviceService, //Fazendo a solicitação de acessos
    private animalService: AnimalService,
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
    this.grupoacessoserviceService.getAcessosParaTela('Cadastro de Registros Médicos').subscribe((acessos: AcessoDTO[]) => {
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
    this.animalService.getAnimals().subscribe((data: AnimalModel[]) => {
      this.animals! = data;
    });
  }

  onAdd() {
    if (this.hasAccess('Cadastrar Registro')) {
      this.router.navigate(['addRegistro'], { relativeTo: this.route });
    } else {
      this.showAccessDeniedModal();
    }
  }

  onEdit(idUser: any) {
    if (this.hasAccess('Alterar Registro Médico')) {
      this.router.navigate(['editRegistro', idUser], { relativeTo: this.route });
    } else {
      this.showAccessDeniedModal();
    }
  }

  onRemove(idUser: any) {
    if (this.hasAccess('Excluir Animal')) {
      this.animalService.deleteAnimal(idUser).subscribe(() =>{
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro excluido com sucesso' });
        window.location.reload();
        this.router.navigateByUrl('/animal')
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
