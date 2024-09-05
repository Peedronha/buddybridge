import {Raca} from "../../raca/model/raca.model";
import {Tipo} from "../../tipo_animal/model/tipo.model";

export interface AnimalCard {
  id_perfil_adocao?: number;
  id_adocao?: number;
  id_animal?: number;
  nome_animal?: string;
  peso_animal?: number;
  comprimento_animal?: number;
  idade?: string;
  raca_animal?: Raca;
  tipo_animal?: Tipo;
  genero_animal?: string;
  localizacao_animal?: string;
  priority?: number;
  image?: string;
  medical_necessities?: string;
}
