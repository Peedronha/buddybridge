export class AdoptionModel {
  id_adocao: number | undefined;
  id_animal!: number | undefined;
  nome_adotante: string | undefined;
  endereco!: string;
  telefone!: string;
  email!: string;
  descricao_experiencia!: string;
  status_adocao!: boolean;
  data_submissao!: string;
}
