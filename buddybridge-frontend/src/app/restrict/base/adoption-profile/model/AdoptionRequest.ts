export interface AdoptionRequest {
  id_adocao?: number;
  id_animal?: number;
  nome_adotante?: string;
  data_nascimento?: string;
  CPF?: string;
  telefone?: string;
  email?: string;
  data_submissao?: Date;
  endereco?: string;
  CEP?: string;
  numero?: string;
  Complemento?: string;
  Bairro?: string;
  Estado?: string;
  Cidade?: string;
}
