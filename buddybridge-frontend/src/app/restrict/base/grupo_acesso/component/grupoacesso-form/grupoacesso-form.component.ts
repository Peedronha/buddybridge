import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { Router, ActivatedRoute } from '@angular/router';
import { GrupoAcessoDTO } from '../../model/grupoacessoDTO';
import { GrupoacessoserviceService } from '../../service/grupoacessoservice.service';
import { AcessoDTO } from '../../model/acessoDTO';

@Component({
  selector: 'app-grupoacesso-form',
  templateUrl: './grupoacesso-form.component.html',
  styleUrls: ['./grupoacesso-form.component.scss']
})
export class GrupoacessoFormComponent implements OnInit {

  acessos!: AcessoDTO[];
  selectedAcessos: AcessoDTO[] = [];

  registerForm = this.fb.group({
    idGrupoAcesso: [null as number | null],
    descricaoGrupoAcesso: ['', [Validators.required]],
    ativoGrupoAcesso: [true, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private grupoAcessoService: GrupoacessoserviceService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    const grupoAcessoDTO: GrupoAcessoDTO = this.activatedRoute.snapshot.data['grupoacesso'];

    if (grupoAcessoDTO.idGrupoAcesso) {
        console.log(grupoAcessoDTO);
        this.registerForm.setValue({
            idGrupoAcesso: grupoAcessoDTO.idGrupoAcesso,  // Define o ID do grupo de acesso no formulário
            descricaoGrupoAcesso: grupoAcessoDTO.descricaoGrupoAcesso || '',
            ativoGrupoAcesso: grupoAcessoDTO.ativoGrupoAcesso ?? true,
        });

        // Se houver um grupo de acesso, busca os acessos pelo ID do grupo
        this.grupoAcessoService.getAcesso(grupoAcessoDTO.idGrupoAcesso).subscribe(
            (data: AcessoDTO[]) => {
                this.acessos = data;
                // Pré-selecionar itens onde ativoAcesso é true
                this.selectedAcessos = this.acessos.filter(acesso => acesso.ativoAcesso);
            },
            (error) => {
                console.error('Erro ao carregar acessos por grupo:', error);
            }
        );
    } else {
        // Se não houver grupo de acesso, busca todos os acessos
        this.grupoAcessoService.getAcessos().subscribe(
            (data: AcessoDTO[]) => {
                this.acessos = data;
                // Pré-selecionar itens onde ativoAcesso é true
                this.selectedAcessos = this.acessos.filter(acesso => acesso.ativoAcesso);
            },
            (error) => {
                console.error('Erro ao carregar todos os acessos:', error);
            }
        );
    }
  }

  get idGrupoAcesso() {
    return this.registerForm.get('idGrupoAcesso');
  }

  get descricaoGrupoAcesso() {
    return this.registerForm.get('descricaoGrupoAcesso');
  }

  get ativoGrupoAcesso() {
    return this.registerForm.get('ativoGrupoAcesso');
  }

  submitDetails() {
    const grupoAcessoDTO: GrupoAcessoDTO = {
      idGrupoAcesso: this.registerForm.get('idGrupoAcesso')?.value,
      descricaoGrupoAcesso: this.registerForm.get('descricaoGrupoAcesso')?.value,
      ativoGrupoAcesso: this.registerForm.get('ativoGrupoAcesso')?.value,
      acessos: this.selectedAcessos,
    } as GrupoAcessoDTO;

    if (grupoAcessoDTO.idGrupoAcesso) {
      grupoAcessoDTO.acessos = this.selectedAcessos;

      this.grupoAcessoService.updateGrupoAcesso(grupoAcessoDTO).subscribe(
        response => {
          //console.log('Grupo de acesso atualizado com sucesso:', response);
          //this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Atualizado com sucesso' });
          this.router.navigate(['grupoacesso'])
          // Trate a resposta conforme necessário (ex: redirecionamento, mensagem de sucesso, etc.)
        },
        error => {
          //console.error('Erro ao atualizar grupo de acesso:', error);
          this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Erro!' });
          // Trate o erro conforme necessário (ex: exibir mensagem de erro)
        }
      );
    } else {
      grupoAcessoDTO.acessos = this.selectedAcessos;

      this.grupoAcessoService.createGrupoAcesso(grupoAcessoDTO).subscribe(
        response => {
          //console.log('Grupo de acesso criado com sucesso:', response);
          //this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registrado com sucesso' });
          this.router.navigate(['grupoacesso'])
          // Trate a resposta conforme necessário (ex: redirecionamento, mensagem de sucesso, etc.)
        },
        error => {
          //console.error('Erro ao criar grupo de acesso:', error);
          this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Erro!' });

          // Trate o erro conforme necessário (ex: exibir mensagem de erro)
        }
      );
    }
  }
}
