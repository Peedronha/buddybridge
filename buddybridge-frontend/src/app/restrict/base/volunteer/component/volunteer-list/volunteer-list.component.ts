import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Volunteer } from '../../model/volunteer.model';
@Component({
  selector: 'app-volunteer-list',
  templateUrl: './volunteer-list.component.html',
  styleUrl: './volunteer-list.component.scss'
})
export class VolunteerListComponent {

  loading: boolean = false;
  showHidden: boolean = false;

  @Input() volunteers!: Volunteer[];
  _specificVolunteer: any = {};
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() editPassword = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  constructor() { }

  ngOnInit(): void { }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(idUser: any) {
    this.edit.emit(idUser);
  }

  onDelete(idUser: any) {
    this.remove.emit(idUser);
  }

  onEditPassword(idUser: any) {
    this.editPassword.emit(idUser);
  }

}
