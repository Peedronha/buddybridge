import { AccountRestrictService } from './../base/account/shared/account-restrict.service';
import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {LayoutService} from './service/app.layout.service';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../../open/account/model/user.model';


@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  nome: any = '';
  model: any[] = [];

  constructor(
    public layoutService: LayoutService,
    public fb: FormBuilder,
    public accountRestrictService : AccountRestrictService
  ) { }


  ngOnInit() {
    this.accountRestrictService.getUsuarioLogado().subscribe((data: User) => {
      console.log(data);
      this.nome = data.nome;
    });
    this.model = [
      {
        label: 'Inicio',
        items: [
          {label: 'Painel de controle', icon: 'pi pi-fw pi-home', routerLink: ['/']},
          //{label: 'Minhas Adoções', icon: 'pi pi-fw pi-desktop', routerLink: ['/']}
        ]
      },
      {
        label: 'Buddy Base',
        items: [
          {
            label: 'Cadastros Gerais',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Usuários', icon: 'pi pi-fw pi-id-card', routerLink: ['/account']
              },
              {
                label: 'Colaboradores', icon: 'pi  pi-fw pi-share-alt', routerLink: ['/volunteer']
              },
            ]
          },
          {
            label: 'Configurações',
            icon: 'pi pi-fw pi-cog',
            items: [
                {
                  label: 'Dados da Ong', icon: 'pi pi-fw pi-bookmark', routerLink: ['/ong']
                },
                /*{
                  label: 'Opções de Sistema', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/floatlabel']
                },*/
            ]
          },
          /*{ label: 'Relatórios Gerenciais', icon: 'pi pi-fw pi-print', routerLink: ['/utilities/icons'] }*/
        ]
      },
            {
                label: 'Buddy Animais',
                items: [
                    { label: 'Animais', icon: 'pi pi-fw pi-heart', routerLink: ['/animal'] },
                    { label: 'Adoções', icon: 'pi pi-fw pi-heart', routerLink: ['restrict/manage-adoption'] },
                    {
                      label: 'Configurações',
                      icon: 'pi pi-fw pi-cog',
                      items: [
                        {
                          label: 'Cadastro de Raças', icon: 'pi  pi-fw pi-folder-open', routerLink: ['/racas']
                        },
                        {
                          label: 'Cadastro de Espécies', icon: 'pi  pi-fw pi-folder-open', routerLink: ['/tipos']
                        },
                        {
                          label: 'Cadastro de Perfis de Adoção', icon: 'pi  pi-fw pi-folder-open', routerLink: ['/perfil-adocao']
                        },
                        /*{
                          label: 'Opções de Sistema', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/floatlabel']
                        }*/
                      ]
                    },
                    /*{ label: 'Relatórios Gerenciais', icon: 'pi pi-fw pi-print', routerLink: ['/utilities/icons'] }*/
                ]
            },
            /*{
                label: 'Buddy Financeiro',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                      label: 'Configurações',
                      icon: 'pi pi-fw pi-cog',
                      items: [
                          {
                            label: 'Opções de Sistema', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/floatlabel']
                          }
                      ]
                    },
                    { label: 'Relatórios Gerenciais', icon: 'pi pi-fw pi-print', routerLink: ['/utilities/icons'] }
                ]
            },*/

    ];
  }
}
