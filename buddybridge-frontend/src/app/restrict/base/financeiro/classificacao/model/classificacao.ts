export class Classificacao {
  idClassificacao?: number;
  descricaoClassificacao?: string;
  ativoClassificacao?: boolean;
  tipo?: string; // "Entrada" ou "Saída"

  constructor() {
    this.idClassificacao = undefined;
    this.descricaoClassificacao = '';
    this.ativoClassificacao = true;
    this.tipo = '';
  }
}
