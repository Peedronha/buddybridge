import { AccountRestrictService } from './../base/account/shared/account-restrict.service';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { FormBuilder } from '@angular/forms';
import { User } from '../../open/account/model/user.model';
import { MenuService, MenuItem  } from './service/app.menu.service';

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
    public accountRestrictService : AccountRestrictService,
    public menuService: MenuService
  ) { }

  ngOnInit() {
    this.accountRestrictService.getUsuarioLogado().subscribe((data: User) => {
      console.log(data);
      this.nome = data.nome;
    });

    this.menuService.getMenuItems().subscribe((data: MenuItem[]) => {
      this.model = this.buildMenu(data);
    });

  }

  buildMenu(menuItems: MenuItem[]): any[] {
    const menu = [];

    // Organize os itens por módulo
    const groupedModules = menuItems.reduce((acc: { [key: string]: MenuItem[] }, item) => {
      const moduleName = item.telaAcesso;
      if (!acc[moduleName]) {
        acc[moduleName] = [];
      }
      acc[moduleName].push(item);
      return acc;
    }, {} as { [key: string]: MenuItem[] });

    // Crie a estrutura de menu com base nos módulos e itens
    for (const moduleName in groupedModules) {
      if (groupedModules.hasOwnProperty(moduleName)) {
        const moduleItems = groupedModules[moduleName];

        const mainItems = moduleItems.filter(item => item.tipoAcesso === 'GET');
        const subItems = moduleItems.filter(item => item.tipoAcesso !== 'GET');

        const items = mainItems.map(mainItem => {
          // Verifica se o item tem a URL "/menu" para ser considerado como drop menu
          if (mainItem.urlAcesso === '/menu') {
            const subMenuItems = subItems.filter(subItem => subItem.tipoAcesso === mainItem.descricaoAcesso);

            return {
              label: mainItem.descricaoAcesso,
              icon: `pi pi-fw ${mainItem.iconeAcesso}`,
              items: subMenuItems.map(subItem => ({
                label: subItem.descricaoAcesso,
                icon: `pi pi-fw ${subItem.iconeAcesso}`,
                routerLink: [subItem.urlAcesso],
              }))
            };
          } else {
            // Se não for "/menu", será um item simples
            return {
              label: mainItem.descricaoAcesso,
              icon: `pi pi-fw ${mainItem.iconeAcesso}`,
              routerLink: [mainItem.urlAcesso],
            };
          }
        });

        menu.push({
          label: moduleName.replace('_', ' '),
          items: items,
        });
      }
    }

    return menu;
  }


}
