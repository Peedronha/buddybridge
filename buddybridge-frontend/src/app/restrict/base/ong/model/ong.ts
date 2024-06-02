import { UsuarioEndereco } from './../../../../open/account/model/usuarioEndereco.model';
export class Ong {
  razaoSocialOng!: string;
  cnpjOng!: string;
  missaoOng?: string;
  varoresOng?: string;
  visaoOng?: string;
  telefoneOng!: string;
  whatsappOng!: string;
  emailFinanceiroOng!: string;
  emailContatoOng!: string;
  historiaOng?: string;
  instagramOng?: string;
  facebookOng?: string;
  twitterOng?: string;
  linkedinOng?: string;
  usuarioOng!: number | undefined;
  ongEndereco?: UsuarioEndereco;
}
