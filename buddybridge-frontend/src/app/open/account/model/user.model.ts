import { UsuarioEndereco } from "./usuarioEndereco.model";

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
}
