import { OngService } from '../../restrict/base/ong/service/ong.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsuarioEndereco } from '../account/model/usuarioEndereco.model';
import { Ong } from '../../restrict/base/ong/model/ong';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-insitucional',
  templateUrl: './insitucional.component.html',
  styleUrl: './insitucional.component.scss'
})
export class InsitucionalComponent {
  registerForm = this.fb.group({
    idOng: '',
    razaoSocialOng: ['', [Validators.required]],
    cnpjOng: ['', [Validators.required]],
    missaoOng: [''],
    valoresOng: [''],
    visaoOng: [''],
    telefoneOng:  ['', [Validators.required]],
    whatsappOng:  ['', [Validators.required]],
    emailFinanceiroOng: ['', [Validators.required, Validators.email]],
    emailContatoOng: ['', [Validators.required, Validators.email]],
    historiaOng: [''],
    instagramOng: [''],
    facebookOng: [''],
    twitterOng: [''],
    linkedinOng: [''],

    logradouroEndereco: [''],
    numeroEndereco: [''],
    cidadeEndereco: [''],
    estadoEndereco: [''],
    paisEndereco: [''],
    cepEndereco: [''],
    bairroEndereco: [''],
    complementoEndereco: [''],
  })

  constructor(
    private fb: FormBuilder,
    private ongService: OngService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.ongService.getOngById('1').pipe(
      catchError((error) => {
        console.error('Erro ao carregar dados da ONG:', error);
        // Define valores padrão em caso de erro
        const defaultData: Ong = {
          idOng: parseInt('0'),
          razaoSocialOng: 'Razão Social não cadastrado',
          cnpjOng: 'CNPJ não cadastrado',
          missaoOng: 'Missão não cadastrado',
          valoresOng: 'Valores não disponíveis',
          visaoOng: 'Visão não cadastrado',
          telefoneOng: 'Telefone não cadastrado',
          whatsappOng: 'WhatsApp não cadastrado',
          emailFinanceiroOng: 'Email Financeiro não cadastrado',
          emailContatoOng: 'Email de Contato não cadastrado',
          historiaOng: 'História não cadastrado',
          instagramOng: 'Instagram não cadastrado',
          facebookOng: 'Facebook não cadastrado',
          twitterOng: 'Twitter não cadastrado',
          linkedinOng: 'LinkedIn não cadastrado',
          ongEndereco: {
            logradouroEndereco: 'Logradouro não cadastrado',
            numeroEndereco: 'Número não cadastrado',
            cidadeEndereco: 'Cidade não cadastrado',
            estadoEndereco: 'Estado não cadastrado',
            paisEndereco: 'País não cadastrado',
            cepEndereco: 'CEP não cadastrado',
            bairroEndereco: 'Bairro não cadastrado',
            complementoEndereco: 'Complemento não cadastrado'
          }
        };
        return of(defaultData);
      })
    ).subscribe((data: Ong) => {
      this.registerForm.setValue({
        idOng: data.idOng != null && data.idOng != undefined ? data.idOng+'' : 'ID não cadastrado',
        razaoSocialOng: data.razaoSocialOng != null && data.razaoSocialOng != undefined ? data.razaoSocialOng : 'Razão Social não cadastrado',
        cnpjOng: data.cnpjOng != null && data.cnpjOng != undefined ? data.cnpjOng + '' : 'CNPJ não cadastrado',
        missaoOng: data.missaoOng != null && data.missaoOng != undefined ? data.missaoOng + '' : 'Missão não cadastrado',
        valoresOng: data.valoresOng != null && data.valoresOng != undefined ? data.valoresOng + '' : 'Valores não disponíveis',
        visaoOng: data.visaoOng != null && data.visaoOng != undefined ? data.visaoOng + '' : 'Visão não cadastrado',
        telefoneOng: data.telefoneOng != null && data.telefoneOng != undefined ? data.telefoneOng : 'Telefone não cadastrado',
        whatsappOng: data.whatsappOng != null && data.whatsappOng != undefined ? data.whatsappOng : 'WhatsApp não cadastrado',
        emailFinanceiroOng: data.emailFinanceiroOng != null && data.emailFinanceiroOng != undefined ? data.emailFinanceiroOng : 'Email Financeiro não cadastrado',
        emailContatoOng: data.emailContatoOng != null && data.emailContatoOng != undefined ? data.emailContatoOng : 'Email de Contato não cadastrado',
        historiaOng: data.historiaOng != null && data.historiaOng != undefined ? data.historiaOng + '' : 'História não cadastrado',
        instagramOng: data.instagramOng != null && data.instagramOng != undefined ? data.instagramOng + '' : 'Instagram não cadastrado',
        facebookOng: data.facebookOng != null && data.facebookOng != undefined ? data.facebookOng + '' : 'Facebook não cadastrado',
        twitterOng: data.twitterOng != null && data.twitterOng != undefined ? data.twitterOng + '' : 'Twitter não cadastrado',
        linkedinOng: data.linkedinOng != null && data.linkedinOng != undefined ? data.linkedinOng + '' : 'LinkedIn não cadastrado',
        logradouroEndereco: data.ongEndereco?.logradouroEndereco != null && data.ongEndereco?.logradouroEndereco != undefined ? data.ongEndereco?.logradouroEndereco + '' : 'Logradouro não cadastrado',
        numeroEndereco: data.ongEndereco?.numeroEndereco != null && data.ongEndereco?.numeroEndereco != undefined ? data.ongEndereco?.numeroEndereco + '' : 'Número não cadastrado',
        cidadeEndereco: data.ongEndereco?.cidadeEndereco != null && data.ongEndereco?.cidadeEndereco != undefined ? data.ongEndereco?.cidadeEndereco + '' : 'Cidade não cadastrado',
        estadoEndereco: data.ongEndereco?.estadoEndereco != null && data.ongEndereco?.estadoEndereco != undefined ? data.ongEndereco?.estadoEndereco + '' : 'Estado não cadastrado',
        paisEndereco: data.ongEndereco?.paisEndereco != null && data.ongEndereco?.paisEndereco != undefined ? data.ongEndereco?.paisEndereco + '' : 'País não cadastrado',
        cepEndereco: data.ongEndereco?.cepEndereco != null && data.ongEndereco?.cepEndereco != undefined ? data.ongEndereco?.cepEndereco + '' : 'CEP não cadastrado',
        bairroEndereco: data.ongEndereco?.bairroEndereco != null && data.ongEndereco?.bairroEndereco != undefined ? data.ongEndereco?.bairroEndereco + '' : 'Bairro não cadastrado',
        complementoEndereco: data.ongEndereco?.complementoEndereco != null && data.ongEndereco?.complementoEndereco != undefined ? data.ongEndereco?.complementoEndereco + '' : 'Complemento não cadastrado',
      });
    });
  }
}
