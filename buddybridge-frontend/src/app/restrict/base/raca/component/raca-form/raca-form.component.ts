import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Raca} from "../../model/raca.model";
import {RacaService} from "../../../raca/service/raca.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../../../../open/account/shared/account.service";
import {Tipo} from "../../../tipo_animal/model/tipo.model";
import {TipoService} from "../../../tipo_animal/service/tipo.service";

@Component({
  selector: 'app-raca-form',
  templateUrl: './raca-form.component.html',
  styleUrl: './raca-form.component.scss'
})
export class RacaFormComponent {

  registerForm = this.fb.group({
    id_raca:[''],
    nome_raca: ['',Validators.required],
    id_tipo: ['', Validators.required],
  })

  tipos: Tipo[] = [];
  selectTipo: Tipo | undefined;

  constructor(
    private fb: FormBuilder,
    private racaService: RacaService,
    private messageService: MessageService,
    private router: ActivatedRoute,
    private route: Router,
    private accountService : AccountService,
    private tipoService: TipoService
  ) { }

  ngOnInit(): void {
    this.accountService.validarSessao();
    const raca: Raca = this.router.snapshot.data['raca'];

    this.registerForm.setValue({
      id_raca: raca.id +'',
      nome_raca: raca.name + '',
      id_tipo: raca.id_tipo+'',
    })
    this.tipoService.getTipos().subscribe(tipos => {
      this.tipos = tipos;
      this.selectTipo = this.tipos.find(tipo => tipo.id === raca.id_tipo);
    });

    this.registerForm.get('id_tipo')?.valueChanges.subscribe(type => {
      this.onTypeChange(type);
    });

  }

  submitDetails() {
    let raca = new Raca();

    var id = this.registerForm.get('id_raca')?.value+'';
    raca.id = parseInt(id);
    raca.name = this.registerForm.get('nome_raca')?.value+''.trim();

    raca.id_tipo = this.selectTipo?.id?.toString() || '';

    if (this.registerForm.get('id_raca')?.value + '' != 'NaN'){
      this.racaService.updateRaca(raca).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Raça registrada com sucesso' });
          this.registerForm.reset();
          this.route.navigateByUrl('/racas')
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao validar a raça' });
        },
      )
    } else {
      raca.id = undefined
      this.racaService.registerRaca(raca).subscribe(
        response => {
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Raça registrada com sucesso!'});
          this.registerForm.reset();
          this.route.navigateByUrl('/racas')
        },
        error => {
          this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao cadastrar a raça'});
        },
      )
    }
  }


  get id_raca() {
    return this.registerForm.get('id_raca');
  }

  get nome_raca() {
    return this.registerForm.get('nome_raca');
  }
  get tipo_raca() {
    return this.registerForm.get('id_tipo');
  }

  onTypeChange(type: any): void {
    this.tipoService.getTipos().subscribe(tipos => {
      this.tipos = tipos;
    });
  }
}
