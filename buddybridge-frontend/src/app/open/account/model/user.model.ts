import { UsuarioEndereco } from "./usuarioEndereco.model";
import { GrupoAcesso } from "../../../restrict/base/grupo_acesso/model/grupoAcesso";
export class User {
  id: number | undefined;
  nome!: string;
  login!: string;
  senha?: string;
  role!: string;
  confirmacaoEmail?: boolean;
  token?: string;
  telefone?: string;
  usuarioEndereco?: UsuarioEndereco;
  grupoAcessoUsuario?: GrupoAcesso | null;
}
