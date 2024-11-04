import {Component} from "@angular/core";
import {AnimalModel} from "../../model/animal.model";
import {AnimalService} from "../../service/animal.service";
import {AccountService} from "../../../../../open/account/shared/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import { AcessoDTO } from "../../../grupo_acesso/model/acessoDTO";
import { GrupoacessoserviceService } from "../../../grupo_acesso/service/grupoacessoservice.service";
import { HistoricoMedicoService } from "../../../historico-medico/service/historico-medico.service";

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrl: './animal.component.scss'
})
export class AnimalComponent {
  animals!: AnimalModel[]

    //Fazendo a solicitação de acessos - inicio
    acessos: AcessoDTO[] = [];
    displayModal: boolean = false;
    canEditOng: boolean = false;
    //Fazendo a solicitação de acessos - fim

  constructor(
    private grupoacessoserviceService: GrupoacessoserviceService, //Fazendo a solicitação de acessos
    private historicoMedicoService: HistoricoMedicoService,
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
    this.grupoacessoserviceService.getAcessosParaTela('Cadastro de Animais').subscribe((acessos: AcessoDTO[]) => {
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
    if (this.hasAccess('Cadastrar Animal')) {
      this.router.navigate(['addanimal'], { relativeTo: this.route });
    } else {
      this.showAccessDeniedModal();
    }
  }

  onEdit(idUser: any) {
    if (this.hasAccess('Alterar Animal')) {
      this.router.navigate(['editanimal', idUser], { relativeTo: this.route });
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

  onAddHistorico(idAnimal: number) {
    if (this.hasAccess('Cadastrar Histórico médico')) {
      this.router.navigate(['/report/addRegistro'], { queryParams: { animalId: idAnimal } });
    } else {
      this.showAccessDeniedModal();
    }
  }
  onEditHistorico(id: number) {
    if (this.hasAccess('Alterar Histórico médico')) {
      this.router.navigate(['/report/editRegistro/'+id]);
    } else {
      this.showAccessDeniedModal();
    }

  }
  onDeleteHistorico(id: number) {
    if (this.hasAccess('Excluir Histórico médico')) {
      this.historicoMedicoService.deleteMedicalReport(id).subscribe(() =>{
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
