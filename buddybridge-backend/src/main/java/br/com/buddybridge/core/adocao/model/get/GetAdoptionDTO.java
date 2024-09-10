package br.com.buddybridge.core.adocao.model.get;

import br.com.buddybridge.core.adocao.entity.AdoptionModel;
import br.com.buddybridge.core.adocao.entity.AdoptionProfileModel;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GetAdoptionDTO {
    private String id_perfil_adocao;
    private String id_adocao;
    private String id_animal;
    private String nome_adotante;
    private String nome_animal;
    private String status_adocao;
    private Integer priority;
    private String idade;
    private String medical_necessities;
    private String image;
    private LocalDateTime data_criacao;

    public GetAdoptionDTO(AdoptionModel model) {
        this.id_perfil_adocao = String.valueOf(model.getProfile().getId_perfil_adocao());
        this.id_adocao = String.valueOf(model.getId_adocao());
        this.id_animal = String.valueOf(model.getProfile().getAnimal().getId_animal());
        this.nome_adotante = model.getAdopter() != null ? model.getAdopter().getNome_adotante() : null;
        this.nome_animal = String.valueOf(model.getProfile().getAnimal().getNome_animal());
        this.status_adocao = String.valueOf(model.getStatus_adocao());
    }

    public GetAdoptionDTO(AdoptionProfileModel model) {
        this.id_perfil_adocao = String.valueOf(model.getId_perfil_adocao());
        this.id_adocao = String.valueOf(model.getAdocao().getId_adocao());
        this.id_animal = String.valueOf(model.getAnimal().getId_animal());
        this.nome_animal = String.valueOf(model.getAnimal().getNome_animal());
        this.status_adocao = String.valueOf(model.getAdocao().getStatus_adocao());
    }
}
