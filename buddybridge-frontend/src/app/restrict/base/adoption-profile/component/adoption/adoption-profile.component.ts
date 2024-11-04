import { Component } from '@angular/core';
import {AdoptionProfileListComponent} from "../adoption-list/adoption-profile-list.component";
import {AccountService} from "../../../../../open/account/shared/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AdoptionService} from "../../shared/adoption.service";
import {AdoptionProfileModel} from "../../model/AdoptionProfileModel";
import { GrupoacessoserviceService } from '../../../grupo_acesso/service/grupoacessoservice.service';
import { AcessoDTO } from '../../../grupo_acesso/model/acessoDTO';

@Component({
  selector: 'app-adoption-profile',
  templateUrl: './adoption-profile.component.html',
  styleUrl: './adoption-profile.component.scss'
})
export class AdoptionProfileComponent {
  profiles!: AdoptionProfileModel[]

  //Fazendo a solicitação de acessos - inicio
  acessos: AcessoDTO[] = [];
  displayModal: boolean = false;
  //Fazendo a solicitação de acessos - fim

  constructor(
    private adoptionService: AdoptionService,
    private accountService: AccountService,
    private grupoacessoserviceService: GrupoacessoserviceService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.refresh();
  }

  ngOnInit(): void {
    this.accountService.validarSessao();
    this.grupoacessoserviceService.getAcessosParaTela('Cadastro de perfil de adoção').subscribe((acessos: AcessoDTO[]) => {
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
    this.adoptionService.getAnimalsByProfileStatus().subscribe((data: AdoptionProfileModel[]) => {
      this.profiles! = data;
    });
  }

  onAdd() {
    if (this.hasAccess('Cadastrar perfil de adoção')) {
      this.router.navigate(['addperfil'], { relativeTo: this.route });
    } else {
      this.showAccessDeniedModal();
    }

  }

  onEdit(idUser: any) {
    if (this.hasAccess('Alterar perfil de adoção')) {
      this.router.navigate(['editperfil', idUser], { relativeTo: this.route });
    } else {
      this.showAccessDeniedModal();
    }

  }

  onRemove(idUser: any) {
    if (this.hasAccess('Excluir perfil de adoção')) {
      this.adoptionService.deleteAdoptionProfile(idUser).subscribe(() =>{
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro excluido com sucesso' });
        window.location.reload();
        this.router.navigateByUrl('/perfil-adocao')
      })
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
