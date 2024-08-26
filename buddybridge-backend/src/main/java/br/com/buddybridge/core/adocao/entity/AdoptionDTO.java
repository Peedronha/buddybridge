package br.com.buddybridge.core.adocao.entity;

import br.com.buddybridge.core.adocao.model.AdoptionProfileModel;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
public class AdoptionDTO {
    private String id_adocao;
    private String id_animal;
    private String nome_adotante;
    private String endereco;
    private String telefone;
    private String email;
    private String descricao_experiencia;
    private String status_adocao;
    private String medical_necessities;
    private String image;

    public AdoptionDTO(AdoptionProfileModel model) {
        this.nome_adotante = model.getNome_adotante();
        this.endereco = model.getEndereco();
        this.telefone = model.getTelefone();
        this.email = model.getEmail();
        this.descricao_experiencia = model.getDescricao_experiencia();
        this.status_adocao = String.valueOf(model.getStatus_adocao());
        this.medical_necessities = model.getMedical_necessities();
        this.image = model.getImage();
    }
}
