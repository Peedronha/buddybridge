import { OngService } from './../../service/ong.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsuarioEndereco } from '../../../../../open/account/model/usuarioEndereco.model';
import { Ong } from '../../model/ong';
import { AccountRestrictService } from '../../../account/shared/account-restrict.service';
import { User } from '../../../../../open/account/model/user.model';
@Component({
  selector: 'app-ong',
  templateUrl: './ong.component.html',
  styleUrl: './ong.component.scss'
})
export class OngComponent {

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
    private accountRestrictService : AccountRestrictService
  ) { }

  ngOnInit(): void {
    this.ongService.getOngById('1').subscribe((data: Ong) => {
      console.log(data);
      this.registerForm.setValue({
        idOng: (data.idOng != null && data.idOng != undefined ? data.idOng+'' : '0'),
        razaoSocialOng: data.razaoSocialOng,
        cnpjOng : data.cnpjOng + '',
        missaoOng : data.missaoOng +'',
        valoresOng: data.valoresOng+'',
        visaoOng : data.visaoOng+'',
        telefoneOng: data.telefoneOng,
        whatsappOng: data.whatsappOng,
        emailFinanceiroOng: data.emailFinanceiroOng,
        emailContatoOng: data.emailContatoOng,
        historiaOng: data.historiaOng+'',
        instagramOng: data.instagramOng+'',
        facebookOng: data.facebookOng+'',
        twitterOng: data.twitterOng+'',
        linkedinOng: data.linkedinOng+'',

        logradouroEndereco: data.ongEndereco?.logradouroEndereco+'',
        numeroEndereco: data.ongEndereco?.numeroEndereco+'',
        cidadeEndereco: data.ongEndereco?.cidadeEndereco+'',
        estadoEndereco: data.ongEndereco?.estadoEndereco+'',
        paisEndereco: data.ongEndereco?.paisEndereco+'',
        cepEndereco: data.ongEndereco?.cepEndereco+'',
        bairroEndereco: data.ongEndereco?.bairroEndereco+'',
        complementoEndereco: data.ongEndereco?.complementoEndereco+'',
      })
    });
  }

  get razaoSocialOng() {
    return this.registerForm.get('razaoSocialOng');
  }

  get cnpjOng() {
    return this.registerForm.get('cnpjOng');
  }

  get missaoOng() {
    return this.registerForm.get('missaoOng');
  }

  get valoresOng() {
    return this.registerForm.get('valoresOng');
  }

  get visaoOng() {
    return this.registerForm.get('visaoOng');
  }

  get telefoneOng() {
    return this.registerForm.get('telefoneOng');
  }

  get whatsappOng() {
    return this.registerForm.get('whatsappOng');
  }

  get emailFinanceiroOng() {
    return this.registerForm.get('emailFinanceiroOng');
  }

  get emailContatoOng() {
    return this.registerForm.get('emailContatoOng');
  }

  get historiaOng() {
    return this.registerForm.get('historiaOng');
  }

  get instagramOng() {
    return this.registerForm.get('instagramOng');
  }

  get facebookOng() {
    return this.registerForm.get('facebookOng');
  }

  get twitterOng() {
    return this.registerForm.get('twitterOng');
  }

  get linkedinOng() {
    return this.registerForm.get('linkedinOng');
  }

  get logradouroEndereco() {
    return this.registerForm.get('logradouroEndereco');
  }

  get numeroEndereco() {
    return this.registerForm.get('numeroEndereco');
  }

  get cidadeEndereco() {
    return this.registerForm.get('cidadeEndereco');
  }

  get estadoEndereco() {
    return this.registerForm.get('estadoEndereco');
  }

  get paisEndereco() {
    return this.registerForm.get('paisEndereco');
  }

  get cepEndereco() {
    return this.registerForm.get('cepEndereco');
  }

  get bairroEndereco() {
    return this.registerForm.get('bairroEndereco');
  }

  get complementoEndereco() {
    return this.registerForm.get('complementoEndereco');
  }


  submitDetails() {
    let ong = new Ong();

    if(this.registerForm.get('idOng')?.value+'' != ''){
      ong.idOng = parseInt(this.registerForm.get('idOng')?.value + '');
    } else {
      ong.idOng = 0;
    }
    ong.razaoSocialOng = this.registerForm.get('razaoSocialOng')?.value + '';
    ong.cnpjOng  = this.registerForm.get('cnpjOng')?.value + '';
    ong.missaoOng  = this.registerForm.get('missaoOng')?.value + '';
    ong.valoresOng = this.registerForm.get('valoresOng')?.value + '';
    ong.visaoOng  = this.registerForm.get('visaoOng')?.value + '';
    ong.telefoneOng = this.registerForm.get('telefoneOng')?.value + '';
    ong.whatsappOng = this.registerForm.get('whatsappOng')?.value + '';
    ong.emailFinanceiroOng = this.registerForm.get('emailFinanceiroOng')?.value + '';
    ong.emailContatoOng = this.registerForm.get('emailContatoOng')?.value + '';
    ong.historiaOng = this.registerForm.get('historiaOng')?.value + '';
    ong.instagramOng = this.registerForm.get('instagramOng')?.value + '';
    ong.facebookOng = this.registerForm.get('facebookOng')?.value + '';
    ong.twitterOng = this.registerForm.get('twitterOng')?.value + '';
    ong.linkedinOng = this.registerForm.get('linkedinOng')?.value + '';

    this.accountRestrictService.getUsuarioLogado().subscribe(
      (user: User) => {
        ong.usuarioOng = user;
      },
      (error) => {
        console.error('Erro ao carregar o usuário logado:', error);
        ong.usuarioOng = undefined;
      }
    );

    ong.ongEndereco = new UsuarioEndereco();
    ong.ongEndereco.logradouroEndereco = this.registerForm.get('logradouroEndereco')?.value + '';
    ong.ongEndereco.numeroEndereco = this.registerForm.get('numeroEndereco')?.value + '';
    ong.ongEndereco.cidadeEndereco = this.registerForm.get('cidadeEndereco')?.value + '';
    ong.ongEndereco.estadoEndereco = this.registerForm.get('estadoEndereco')?.value + '';
    ong.ongEndereco.paisEndereco = this.registerForm.get('paisEndereco')?.value + '';
    ong.ongEndereco.cepEndereco = this.registerForm.get('cepEndereco')?.value + '';
    ong.ongEndereco.bairroEndereco = this.registerForm.get('bairroEndereco')?.value + '';
    ong.ongEndereco.complementoEndereco = this.registerForm.get('complementoEndereco')?.value + '';

    if(ong.idOng != 0 && ong.idOng != undefined){
      this.ongService.updateOng(ong).subscribe(
        response => {
          console.log(response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Dados salvos com sucesso' });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao realizar realizar a operação. Contate o suporte par mais detalhes da transação!' });
        }
      )
    } else {
      this.ongService.registerOng(ong).subscribe(
        response => {
          console.log(response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Dados salvos com sucesso' });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao realizar realizar a operação. Contate o suporte par mais detalhes da transação!' });
        }
      )
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // você pode usar 'auto' se não quiser o efeito de rolagem suave
    });

  }
}
