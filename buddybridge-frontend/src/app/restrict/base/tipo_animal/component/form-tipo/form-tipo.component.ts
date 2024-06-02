import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Tipo} from "../../model/tipo.model";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../../../../open/account/shared/account.service";
import {TipoService} from "../../service/tipo.service";

@Component({
  selector: 'app-form-tipo',
  templateUrl: './form-tipo.component.html',
  styleUrl: './form-tipo.component.scss'
})
export class FormTipoComponent {

  registerForm = this.fb.group({
    id_tipo:[''],
    nome_tipo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    // id_raca: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
  })

  tipos: Tipo[] = [];

  constructor(
    private fb: FormBuilder,
    private tipoService: TipoService,
    private messageService: MessageService,
    private router: ActivatedRoute,
    private route: Router,
    private accountService : AccountService,
  ) { }

  ngOnInit(): void {
    this.accountService.validarSessao();
    const tipo: Tipo = this.router.snapshot.data['tipo'];
    console.log("ngOnInit: "+JSON.stringify(tipo));


    this.registerForm.setValue({
      id_tipo: tipo.id +'',
      nome_tipo: tipo.name + '',
      // id_raca: tipo.races+'',
    })

    // this.registerForm.get('id_raca')?.valueChanges.subscribe(id_tipo => {
    //   this.onTypeChange(id_tipo);
    // });

  }

  submitDetails() {
    alert(this.registerForm.get('id_tipo')?.value+'');

    let tipo = new Tipo();

    var id = this.registerForm.get('id_tipo')?.value+'';
    tipo.id = parseInt(id);
    tipo.name = this.registerForm.get('nome_tipo')?.value+'';
    // tipo.races = this.registerForm.get('id_raca')?.value+'';

    console.log(tipo.id);

    if (this.registerForm.get('id_tipo')?.value + '' != 'NaN'){
      tipo.id = undefined
      this.tipoService.registerTipo(tipo).subscribe(
        response => {
          console.log(response);
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Registrado com sucesso!'});
          this.registerForm.reset();
          this.route.navigateByUrl('/tipo')
        },
        error => {
          this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Já existe um usuário cadastrado no sistema com este email.'});
        },
      )
    } else {
      this.tipoService.updateTipo(tipo).subscribe(
        response => {
          console.log(response);
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registrado com sucesso' });
          this.registerForm.reset();
          this.route.navigateByUrl('/tipo')
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Já existe um usuário com este CPF / Email cadastrado no sistema' });
        },
      )
    }
  }


  get id_tipo() {
    return this.registerForm.get('id_tipo');
  }

  get nome_tipo() {
    return this.registerForm.get('nome_tipo');
  }
  get tipo_tipo() {
    return this.registerForm.get('id_raca');
  }
  //
  // onTypeChange(type: any): void {
  //   this.tipoService.getTipos().subscribe(tipos => {
  //     this.tipos = tipos;
  //   });
  // }
}
