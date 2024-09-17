export interface AdoptionIntention{
  id_adocao: number;//adoption
  id_animal?: string;//adoption?
  id_perfil_adocao:number;//adoption
  nome_adotante: string; //adopter
  data_nascimento: string;//adopter

  data_criacao:string;//adoption
  telefone: string;//adopter
  email: string;//adopter
  observacoes:string,

  data_submissao?: string;//adoption
  status_adocao?:string;

  endereco: string;//address
  CEP: string;//address
  numero: string;//address
  Complemento?: string;//address
  Bairro: string;//address
  Estado: string;//address
  Cidade: string;//address

  alergias: boolean;  // Existem crianças ou pessoas com alergias na casa?
  animaisAntes: boolean;  // Você já teve animais de estimação antes?
  horasFora: number;  // Quantas horas por dia você costuma passar fora de casa?
  quintalSeguro: boolean;  // Você tem um quintal ou área externa segura para o animal brincar?
  cuidadosMedicos: boolean;  // Está disposto a fornecer cuidados médicos?
  motivoAdocao: string;  // Por que você quer adotar este animal em particular? (TextArea)
}
