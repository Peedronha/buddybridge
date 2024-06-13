import { AccountService } from '../../../../../../open/account/shared/account.service';
import { VolunteerService } from '../../../service/volunteer.service';
import { Colaborador } from '../../../model/colaborador';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MenuItem, MessageService} from "primeng/api";
@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrl: './volunteer.component.scss'
})
export class VolunteerComponent {
  colaboradores!: Colaborador[]

  constructor(
    private volunteerService: VolunteerService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.refresh();
  }

  ngOnInit(): void {}

  refresh() {
    this.volunteerService.getVolunteers().subscribe((data: Colaborador[]) => {
      this.colaboradores! = data;
    });
  }

  onAdd() {
    this.router.navigate(['addvolunteer'], { relativeTo: this.route });
  }

  onEdit(idUser: any) {
    this.router.navigate(['editvolunteer', idUser], { relativeTo: this.route });
  }

  onRemove(idUser: any) {
    this.volunteerService.inativarVolunteer(idUser).subscribe(() =>{
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro inativado com sucesso' });
      window.location.reload();
      this.router.navigateByUrl('/volunteer')
    })
  }
}
