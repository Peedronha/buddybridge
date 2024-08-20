import {AnimalModel} from "../../animal/model/animal.model";

export enum AdoptionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED'
}

export interface AdoptionProfileModel {
  id_adocao?: string;
  id_animal: string;
  nome_adotante: string;
  endereco?: string;
  telefone?: string;
  email?: string;
  descricao_experiencia?: string;
  status?: string;
  data_submissao?: string;
  priority?: string;
  medical_necessities?: string;
  image?: string;
}
