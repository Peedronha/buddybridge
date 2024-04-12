import { AccountService } from './../shared/account.service';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../layout/service/app.layout.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../model/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  implements OnInit {

  hide: any;
  email: any;
  invalid: any;

  loginForm = new FormGroup({
    login: new FormControl('',Validators.required),
    senha: new FormControl('',Validators.required),
  });

  constructor(private accountService: AccountService, private router: Router, public layoutService: LayoutService) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    try {
      let autenticacao = new Login();
      autenticacao.username = this.loginForm.get('login')?.value + '';
      autenticacao.password = this.loginForm.get('senha')?.value + '';

      const result = await this.accountService.login(autenticacao);
      console.log(`Login Efetuado: ${result}`);
      // navego para a rota vazia novamente
      this.router.navigate(['']);
    } catch (error) {
      console.error(error);
    }
  }

}
