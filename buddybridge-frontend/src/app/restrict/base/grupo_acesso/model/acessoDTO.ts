export class AcessoDTO  {
  idAcesso: number;
  moduloAcesso: string;
  telaAcesso: string;
  descricaoAcesso: string;
  ativoAcesso: boolean;

  constructor() {
    this.idAcesso = 0;
    this.moduloAcesso = '';
    this.telaAcesso = '';
    this.descricaoAcesso = '';
    this.ativoAcesso = true;
  }
}
