import { GrupoacessoserviceService } from './../../../../grupo_acesso/service/grupoacessoservice.service';
import { Component } from '@angular/core';
import { Classificacao } from '../../model/classificacao';
import { ClassificacaoService } from './../../service/classificacao.service';
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AcessoDTO } from '../../../../grupo_acesso/model/acessoDTO';



@Component({
  selector: 'app-classificacao',
  templateUrl: './classificacao.component.html',
  styleUrl: './classificacao.component.scss'
})
export class ClassificacaoComponent {
  classificacoes!: Classificacao[];

  //Fazendo a solicitação de acessos - inicio
  acessos: AcessoDTO[] = [];
  displayModal: boolean = false;
  //Fazendo a solicitação de acessos - fim

  constructor(
    private classificacaoService: ClassificacaoService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private grupoacessoservice : GrupoacessoserviceService //Fazendo a solicitação de acessos
  ) {
    this.refresh();
  }

  ngOnInit(): void {
    this.grupoacessoservice.getAcessosParaTela('Cadastro de Classificações').subscribe((acessos: AcessoDTO[]) => {
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
    this.classificacaoService.getAllClassificacoes().subscribe((data: Classificacao[]) => {
      this.classificacoes = data;
    });
  }

  onAdd() {
    if (this.hasAccess('Cadastrar Classificação')) {
      this.router.navigate(['addclassificacao'], { relativeTo: this.route });
    } else {
      this.showAccessDeniedModal();
    }
  }

  onEdit(id: any) {
    if (this.hasAccess('Alterar Classificação')) {
      this.router.navigate(['editclassificacao', id], { relativeTo: this.route });
    } else {
      this.showAccessDeniedModal();
    }
  }

  onRemove(id: any) {
    if (this.hasAccess('Excluir Classificação')) {
      this.classificacaoService.deleteClassificacao(id).subscribe(() =>{
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro excluído com sucesso' });
        window.location.reload();
        this.router.navigateByUrl('/classificacao');
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
