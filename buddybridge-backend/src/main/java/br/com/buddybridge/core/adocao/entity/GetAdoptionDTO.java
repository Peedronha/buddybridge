package br.com.buddybridge.core.adocao.entity;

import br.com.buddybridge.core.adocao.model.AdoptionProfileModel;
import br.com.buddybridge.core.adocao.model.AdoptionStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class GetAdoptionDTO {

    private Long id_adocao;
    private Long id_animal;
    private String nome_adotante;
    private String endereco;
    private String telefone;
    private String email;
    private String descricao_experiencia;
    private Boolean status_adocao;
    private AdoptionStatus status;
    private LocalDateTime data_submissao;

    public GetAdoptionDTO(AdoptionProfileModel model) {
    }
}
