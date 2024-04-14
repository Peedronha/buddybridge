import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../../../open/account/model/user.model';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.scss'
})
export class AccountListComponent {

  @Input() users!: User[];
  _specificUser!: User;
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
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

}
