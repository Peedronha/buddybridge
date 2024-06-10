import {AccountService} from '../../open/account/shared/account.service';
import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {LayoutService} from './service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];

  constructor(public layoutService: LayoutService) {
  }

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [
          {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']},
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
