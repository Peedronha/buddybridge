import { User } from "../../../../open/account/model/user.model";

export class Colaborador {
  idcolaborador: number | undefined; // Nome ajustado conforme o backend
  cpf_colaborador!: string;
  cnpj_colaborador!: string;
  cargo_colaborador!: string;
  descricao_atividades_colaborador!: string;
  pf_pj_colaborador!: string;
  usuarioColaborador?: User | null;
}
