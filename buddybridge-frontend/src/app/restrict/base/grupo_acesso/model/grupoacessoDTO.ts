import { AcessoDTO } from "./acessoDTO";

export class GrupoAcessoDTO {
  idGrupoAcesso?: number | undefined;
  descricaoGrupoAcesso?: string;
  ativoGrupoAcesso?: boolean;
  acessos?: AcessoDTO[];

  constructor() {
    this.idGrupoAcesso = undefined;
    this.descricaoGrupoAcesso = '';
    this.ativoGrupoAcesso = true;
    this.acessos = [];
  }
}
