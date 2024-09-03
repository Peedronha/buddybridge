export interface AdoptionFormModel{
  id_adocao?: string;
  id_animal?: string;
  nome_adotante: string;
  data_nascimento: string;
  CPF: string;
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
