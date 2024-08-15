package br.com.buddybridge.core.adocao.entity;

import br.com.buddybridge.core.adocao.model.AdoptionProfileModel;
import br.com.buddybridge.core.adocao.model.AdoptionStatus;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
public class AdoptionDTO {
    private Long id_adocao;
    private Long id_animal;
    private String nome_adotante;
    private String endereco;
    private String telefone;
    private String email;
    private String descricao_experiencia;
    private Boolean status_adocao;
    private AdoptionStatus status;
    public AdoptionDTO(AdoptionProfileModel model) {
    }
}
