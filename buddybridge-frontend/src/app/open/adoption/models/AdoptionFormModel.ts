export interface AdoptionFormModel{
  id_perfil_adocao:number;
  id_adocao: number;
  id_animal?: string;
  nome_adotante: string;
  data_nascimento: string;
  CPF: string;
  idade:string;
  data_criacao:string;
  telefone: string;
  email: string;
  data_submissao?: string;
  endereco: string;
  CEP: string;
  numero: string;
  Complemento?: string;
  Bairro: string;
  Estado: string;
  Cidade: string;
}
