import { Component } from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";

interface Volunteer {
  idvoluntario: number;
  fullName: string;
  cargo_voluntario: string;
  email: string;
  pf_pj_voluntario: string;
}
@Component({
  selector: 'app-list-volunteer',
  templateUrl: './list-volunteer.component.html',
  styleUrl: './list-volunteer.component.scss'
})
export class ListVolunteerComponent {
  volunteers: Volunteer[] = [
    { idvoluntario: 1, fullName: 'John Doe', cargo_voluntario: 'Manager', email: 'john@example.com', pf_pj_voluntario: 'Pessoa Fisica' },
    { idvoluntario: 2, fullName: 'Jane Smith', cargo_voluntario: 'Developer', email: 'jane@example.com', pf_pj_voluntario: 'Pessoa Juridica' },
    { idvoluntario: 3, fullName: 'Alice Johnson', cargo_voluntario: 'Designer', email: 'alice@example.com', pf_pj_voluntario: 'Pessoa Fisica' },
    { idvoluntario: 4, fullName: 'Michael Brown', cargo_voluntario: 'Manager', email: 'michael@example.com', pf_pj_voluntario: 'Pessoa Fisica' },
    { idvoluntario: 5, fullName: 'Emily Jones', cargo_voluntario: 'Developer', email: 'emily@example.com', pf_pj_voluntario: 'Pessoa Fisica' },
    { idvoluntario: 6, fullName: 'David Wilson', cargo_voluntario: 'Designer', email: 'david@example.com', pf_pj_voluntario: 'Pessoa Juridica' },
    { idvoluntario: 7, fullName: 'Emma Davis', cargo_voluntario: 'Manager', email: 'emma@example.com', pf_pj_voluntario: 'Pessoa Fisica' },
    { idvoluntario: 8, fullName: 'James Martinez', cargo_voluntario: 'Developer', email: 'james@example.com', pf_pj_voluntario: 'Pessoa Fisica' },
    { idvoluntario: 9, fullName: 'Olivia Taylor', cargo_voluntario: 'Designer', email: 'olivia@example.com', pf_pj_voluntario: 'Pessoa Fisica' },
    { idvoluntario: 10, fullName: 'William Anderson', cargo_voluntario: 'Manager', email: 'william@example.com', pf_pj_voluntario: 'Pessoa Juridica' },
    { idvoluntario: 11, fullName: 'Sophia Thomas', cargo_voluntario: 'Developer', email: 'sophia@example.com', pf_pj_voluntario: 'Pessoa Fisica' },
    { idvoluntario: 12, fullName: 'Daniel Hernandez', cargo_voluntario: 'Designer', email: 'daniel@example.com', pf_pj_voluntario: 'Pessoa Fisica' },
    { idvoluntario: 13, fullName: 'Isabella Moore', cargo_voluntario: 'Manager', email: 'isabella@example.com', pf_pj_voluntario: 'Pessoa Fisica' },
    { idvoluntario: 14, fullName: 'Alexander White', cargo_voluntario: 'Developer', email: 'alexander@example.com', pf_pj_voluntario: 'Pessoa Fisica' },
    { idvoluntario: 15, fullName: 'Mia Harris', cargo_voluntario: 'Designer', email: 'mia@example.com', pf_pj_voluntario: 'Pessoa Juridica' }
  ];

  loading: boolean = false;

  showHidden: boolean = false;
  _specificVolunter: any = {};


  items: MenuItem[];

  constructor(private messageService: MessageService) {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
          this.update();
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {
          this.delete();
        }
      },
      { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' },
      { separator: true },
      { label: 'Installation', icon: 'pi pi-cog', routerLink: ['/installation'] }
    ];
  }

  onSearch(event: any) {
    const searchTerm = event.target.value;
  }

  updateState(idvoluntario: any){
    this._specificVolunter = this.volunteers.find(volunteer => volunteer.idvoluntario === idvoluntario) || null;
    this.showHidden = true;
  }

  save(severity: string) {
    this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
  }

  update() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
  }

  delete() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Deleted' });
  }
}
