import { User } from '../../../../open/account/model/user.model';
import { UsuarioEndereco } from './../../../../open/account/model/usuarioEndereco.model';
import { GrupoAcesso } from '../../grupo_acesso/model/grupoAcesso';

export class Ong {
  idOng!: number | undefined;
  razaoSocialOng!: string;
  cnpjOng!: string;
  missaoOng?: string;
  valoresOng?: string;
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
  usuarioOng?: User;
  ongEndereco?: UsuarioEndereco;
  grupoAcessoAdotante?: GrupoAcesso | null;
  grupoAcessoColaborador?: GrupoAcesso | null;
}
