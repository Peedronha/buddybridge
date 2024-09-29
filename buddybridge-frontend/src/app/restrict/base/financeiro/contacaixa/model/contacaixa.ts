export class ContaCaixa {
  idContaCaixa?: number;
  descricaoContaCaixa?: string;
  tipoContaCaixa?: string; // "Conta Corrente", "Cartão de Crédito", "Guichê de Atendimento", "Pix"
  ativoContaCaixa?: boolean;

  constructor() {
    this.idContaCaixa = undefined;
    this.descricaoContaCaixa = '';
    this.tipoContaCaixa = '';
    this.ativoContaCaixa = true;
  }
}
