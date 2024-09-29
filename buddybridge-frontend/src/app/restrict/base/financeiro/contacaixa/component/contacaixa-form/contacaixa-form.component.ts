import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { Router, ActivatedRoute } from '@angular/router';
import { ContaCaixaService } from '../../service/contacaixa.service';
import { ContaCaixa } from '../../model/contacaixa';


@Component({
  selector: 'app-conta-caixa-form',
  templateUrl: './contacaixa-form.component.html',
  styleUrls: ['./contacaixa-form.component.scss']
})
export class ContacaixaFormComponent implements OnInit {

  tipos = [
    { label: "Conta Corrente", value: "CONTA_CORRENTE"},
    { label: "Cartão de Crédito", value: "CARTAO_CREDITO" },
    { label: "Guichê de Atendimento", value: "GUICHE_ATENDIMENTO" },
    { label: "PIX", value: "PIX" }
  ];

  registerForm = this.fb.group({
    idContaCaixa: [null as number | null],
    descricaoContaCaixa: ['', [Validators.required]],
    tipoContaCaixa: ['CONTA_CORRENTE', Validators.required],
    ativoContaCaixa: [true, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private contaCaixaService: ContaCaixaService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    const contaCaixa: ContaCaixa = this.activatedRoute.snapshot.data['contacaixa'];
    if (contaCaixa && contaCaixa.idContaCaixa) {
      this.registerForm.setValue({
        idContaCaixa: contaCaixa.idContaCaixa,
        descricaoContaCaixa: contaCaixa.descricaoContaCaixa || '',
        tipoContaCaixa: contaCaixa.tipoContaCaixa || 'CONTA_CORRENTE',
        ativoContaCaixa: contaCaixa.ativoContaCaixa ?? true,
      });
    }
  }

  get idContaCaixa() {
    return this.registerForm.get('idContaCaixa');
  }

  get descricaoContaCaixa() {
    return this.registerForm.get('descricaoContaCaixa');
  }

  get tipoContaCaixa() {
    return this.registerForm.get('tipoContaCaixa');
  }

  get ativoContaCaixa() {
    return this.registerForm.get('ativoContaCaixa');
  }

  submitDetails() {
    const contaCaixa: ContaCaixa = {
      idContaCaixa: this.registerForm.get('idContaCaixa')?.value,
      descricaoContaCaixa: this.registerForm.get('descricaoContaCaixa')?.value,
      tipoContaCaixa: this.registerForm.get('tipoContaCaixa')?.value,
      ativoContaCaixa: this.registerForm.get('ativoContaCaixa')?.value,
    } as ContaCaixa;

    if (contaCaixa.idContaCaixa) {
      this.contaCaixaService.updateContaCaixa(contaCaixa).subscribe(
        response => {
          this.router.navigate(['contacaixa']);
        },
        error => {
          this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Erro ao atualizar conta de caixa!' });
        }
      );
    } else {
      this.contaCaixaService.saveContaCaixa(contaCaixa).subscribe(
        response => {
          this.router.navigate(['contacaixa']);
        },
        error => {
          this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Erro ao criar conta de caixa!' });
        }
      );
    }
  }
}
