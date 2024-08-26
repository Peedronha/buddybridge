package br.com.buddybridge.core.adocao.entity;

import br.com.buddybridge.core.adocao.model.AdoptionProfileModel;
import br.com.buddybridge.core.adocao.model.AdoptionStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class GetAdoptionProfileDTO {

    private Long id_adocao;
    private Long id_animal;
    private String nome_adotante;
    private String endereco;
    private String telefone;
    private String email;
    private String descricao_experiencia;
    private String status;
    private Integer priority;
    private String medical_necessities;
    private String image;
    private LocalDateTime data_submissao;

    public GetAdoptionProfileDTO(AdoptionProfileModel model) {
        this.id_adocao = model.getId_adocao();
        this.id_animal = model.getId_animal() != null ? model.getId_animal().getId_animal() : null;
        this.nome_adotante = model.getNome_adotante();
        this.endereco = model.getEndereco();
        this.telefone = model.getTelefone();
        this.email = model.getEmail();
        this.descricao_experiencia = model.getDescricao_experiencia();
        this.status = model.getStatus_adocao() != null ? model.getStatus_adocao().name() : null;
        this.priority = model.getPriority();
        this.medical_necessities = model.getMedical_necessities();
        this.image = model.getImage();
        this.data_submissao = model.getData_submissao();
    }
}
