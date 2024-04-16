import { Component } from '@angular/core';
import { User } from '../../../../../../open/account/model/user.model';
import { Observable, of } from 'rxjs';
import { AccountRestrictService } from '../../../shared/account-restrict.service';
import { AccountService } from '../../../../../../open/account/shared/account.service';
import {MenuItem, MessageService} from "primeng/api";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  users!: User[];

  constructor(
    private accountRestrictService: AccountRestrictService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.refresh();
  }

  ngOnInit(): void { this.accountService.validarSessao(); }

  refresh() {
    this.accountRestrictService.listar().subscribe((data: User[]) => {
      this.users! = data;
    });
  }

  onAdd() {
    this.router.navigate(['addaccount'], { relativeTo: this.route });
  }

  onEdit(idUser: any) {
    this.router.navigate(['editaccount', idUser], { relativeTo: this.route });
  }

  onEditPassword(idUser: any) {
    this.router.navigate(['editpassword', idUser], { relativeTo: this.route });
  }

  onRemove(idUser: any) {
    this.accountRestrictService.deletar(idUser).subscribe(() =>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Deleted' });
    })
  }

}
