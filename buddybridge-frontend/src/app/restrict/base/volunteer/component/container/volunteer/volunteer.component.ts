import { AccountService } from '../../../../../../open/account/shared/account.service';
import { VolunteerService } from '../../../service/volunteer.service';
import { Colaborador } from '../../../model/colaborador';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MenuItem, MessageService} from "primeng/api";
import { GrupoacessoserviceService } from '../../../../grupo_acesso/service/grupoacessoservice.service';
import { AcessoDTO } from '../../../../grupo_acesso/model/acessoDTO';
@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrl: './volunteer.component.scss'
})
export class VolunteerComponent {
  colaboradores!: Colaborador[]

  //Fazendo a solicitação de acessos - inicio
  acessos: AcessoDTO[] = [];
  displayModal: boolean = false;
  canEditOng: boolean = false;
  //Fazendo a solicitação de acessos - fim

  constructor(
    private volunteerService: VolunteerService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private grupoacessoservice : GrupoacessoserviceService //Fazendo a solicitação de acessos
  ) {
    this.refresh();
  }

  ngOnInit(): void {
     //Fazendo a solicitação de acessos - inicio
     this.grupoacessoservice.getAcessosParaTela('Cadastro de Colaboradores').subscribe((acessos: AcessoDTO[]) => {
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
    this.volunteerService.getVolunteers().subscribe((data: Colaborador[]) => {
      this.colaboradores! = data;
    });
  }

  onAdd() {
    if (this.hasAccess('Cadastrar Colaboradores')) {
      this.router.navigate(['addvolunteer'], { relativeTo: this.route });
    } else {
      this.showAccessDeniedModal();
    }
  }

  onEdit(idUser: any) {
    if (this.hasAccess('Alterar Colaboradores')) {
      this.router.navigate(['editvolunteer', idUser], { relativeTo: this.route });
    } else {
      this.showAccessDeniedModal();
    }
  }

  onRemove(idUser: any) {
    if (this.hasAccess('Excluir Colaboradores')) {
      this.volunteerService.inativarVolunteer(idUser).subscribe(() =>{
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro inativado com sucesso' });
        window.location.reload();
        this.router.navigateByUrl('/volunteer')
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
