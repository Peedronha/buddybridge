import { AccountService } from '../../../../../../open/account/shared/account.service';
import { VolunteerService } from '../../../service/volunteer.service';
import { Volunteer } from './../../../model/volunteer.model';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MenuItem, MessageService} from "primeng/api";
@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrl: './volunteer.component.scss'
})
export class VolunteerComponent {
  volunteers!: Volunteer[]

  constructor(
    private volunteerService: VolunteerService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.refresh();
  }

  ngOnInit(): void { this.accountService.validarSessao(); }

  refresh() {
    this.volunteerService.getVolunteers().subscribe((data: Volunteer[]) => {
      this.volunteers! = data;
    });
  }

  onAdd() {
    this.router.navigate(['addvolunteer'], { relativeTo: this.route });
  }

  onEdit(idUser: any) {
    this.router.navigate(['editvolunteer', idUser], { relativeTo: this.route });
  }

  onRemove(idUser: any) {
    this.volunteerService.deleteVolunteer(idUser).subscribe(() =>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Deleted' });
    })
  }
}
