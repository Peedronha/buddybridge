package br.com.buddybridge.core.adocao.entity;

import br.com.buddybridge.core.adocao.model.ProfileDTO;
import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "perfil_adocao")
public class AdoptionProfileModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_perfil_adocao")
    private Long id_perfil_adocao;

    @ManyToOne
    @JoinColumn(name = "id_adocao")
    private AdoptionModel adocao;

    @ManyToOne
    @JoinColumn(name = "id_animal")
    private AnimalModel animal;

    @Column(name = "priority")
    private Integer priority;

    @Column(name = "medical_necessities")
    private String medical_necessities;

    @Column(name = "image")
    private String image;

    @Column(name = "data_criacao")
    private LocalDateTime data_criacao;

    public AdoptionProfileModel(ProfileDTO profileDTO) {
        this.priority = profileDTO.getPriority();
        this.medical_necessities = profileDTO.getMedical_necessities();
        this.image = profileDTO.getImage();
    }
}
