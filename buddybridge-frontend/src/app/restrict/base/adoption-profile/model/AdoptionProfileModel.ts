import {AnimalModel} from "../../animal/model/animal.model";

export enum AdoptionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED'
}

export interface AdoptionProfileModel {
  id_adocao?: number;
  id_animal: number;
  nome_adotante: string;
  endereco?: string;
  telefone?: string;
  email?: string;
  descricao_experiencia?: string;
  status?: AdoptionStatus;
  data_submissao?: string;
  priority?: string;
  medical_necessities?: string;
  image?: string;
}
