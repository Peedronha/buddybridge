package br.com.buddybridge.core.adocao.entity;

import br.com.buddybridge.core.adocao.model.AdoptionProfileModel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PostAdoptionProfileDTO {
    private String id_adocao;
    private String id_animal;
    private String descricao_experiencia;
    private String status_adocao;
    private String medical_necessities;
    private String image;

    public PostAdoptionProfileDTO(AdoptionProfileModel model) {
        this.descricao_experiencia = model.getDescricao_experiencia();
        this.status_adocao = String.valueOf(model.getStatus());
        this.medical_necessities = model.getMedical_necessities();
        this.image = model.getImage();
    }
}
