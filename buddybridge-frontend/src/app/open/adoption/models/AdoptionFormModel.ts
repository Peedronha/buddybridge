export interface AdoptionFormModel{
  id_perfil_adocao:number;//adoption
  id_adocao: number;//adoption
  id_animal?: string;//adoption?
  nome_adotante: string; //adopter
  data_nascimento: string;//adopter
  CPF: string;//adopter
  data_criacao:string;//adoption
  telefone: string;//adopter
  email: string;//adopter
  data_submissao?: string;//adoption
  endereco: string;//address
  CEP: string;//address
  numero: string;//address
  Complemento?: string;//address
  Bairro: string;//address
  Estado: string;//address
  Cidade: string;//address
}
