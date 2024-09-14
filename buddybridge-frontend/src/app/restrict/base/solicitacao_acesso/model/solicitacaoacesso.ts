import { AcessoDTO } from "../../grupo_acesso/model/acessoDTO";
import { GrupoAcessoDTO } from "../../grupo_acesso/model/grupoacessoDTO";

export class Solicitacaoacesso {
  idsolicitacaoAcesso!: number | undefined;
  grupoAcessoAcessoObejto!: GrupoAcessoDTO;
  acessoAcessoObjeto!: AcessoDTO;
  delegadoSolicitacaoAcesso!: boolean; // Novo campo para indicar se o acesso foi delegado

  constructor() {
    this.delegadoSolicitacaoAcesso = false; // Valor padrão para o novo campo
  }
}
