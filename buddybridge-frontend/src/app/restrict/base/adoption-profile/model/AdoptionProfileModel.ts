
export enum AdoptionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED'
}

export interface AdoptionProfileModel {

  id_perfil_adocao?: string;
  id_adocao?: string;
  id_animal?: string;
  priority?: string;
  idade?: string;
  data_criacao?: string;
  data_submissao?: string;

  medical_necessities?: string;
  image?: string;

  status_adocao?: string;

}
