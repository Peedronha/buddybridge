import { Component } from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {VolunteerService} from "../service/volunteer.service";
import {Volunteer} from "../../model/volunteer.model";
import {FormBuilder, Validators} from "@angular/forms";


@Component({
  selector: 'app-list-volunteer',
  templateUrl: './list-volunteer.component.html',
  styleUrl: './list-volunteer.component.scss'
})
export class ListVolunteerComponent {


  volunteers: Volunteer[] = [];

  loading: boolean = false;

  showHidden: boolean = false;

  showEdit: boolean = false;

  _specificVolunteer: any = {};


  items: MenuItem[];

  constructor(private messageService: MessageService, private volunteerService: VolunteerService) {
    this.items = [
      {
        label: 'Editar',
        icon: 'pi pi-wrench',
        command: () => {
          this.updateEdit(this._specificVolunteer);
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: (idvoluntario: any) => {
          this.delete(idvoluntario);
        }
      },
    ];
  }


  ngOnInit(): void {
    this.volunteerService.getVolunteers().subscribe((data: Volunteer[]) => {
      this.volunteers = data;
    });
  }

  onSearch(event: any) {
    const searchTerm = event.target.value;
  }

  updateState(idvoluntario: any){
    this._specificVolunteer = this.volunteers.find(volunteer => volunteer.idvoluntario === idvoluntario) || null;
    this.showHidden = true;
  }

  updateEdit(_specificVolunteer: any){
    // this._specificVolunteer = this.volunteers.find(volunteer => volunteer.idvoluntario === idvoluntario) || null;
    this.showEdit = !this.showEdit;
  }

  save(severity: string) {
    this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
  }

  update() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
  }

  delete(idvoluntario: any) {
    this.volunteerService.deleteVolunteer(idvoluntario).subscribe(() =>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Deleted' });
    })
  }


  showCnpj() {
    this.showHidden = true;
  }
}
