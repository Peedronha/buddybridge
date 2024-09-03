package br.com.buddybridge.core.adocao.entity;

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

    @OneToOne
    private AdoptionModel adocao;

    @Column(name = "priority")
    private Integer priority;

    @Column(name = "medical_necessities")
    private String medical_necessities;

    @Column(name = "image")
    private String image;

    @Column(name = "data_criacao")
    private LocalDateTime data_criacao;

    public AdoptionProfileModel(AdoptionDTO adoptionDTO) {
        this.medical_necessities = adoptionDTO.getMedical_necessities();
        this.image = adoptionDTO.getImage();
    }

    public AdoptionProfileModel(PostAdoptionProfileDTO adoptionDTO) {
        this.medical_necessities = adoptionDTO.getMedical_necessities();
        this.image = adoptionDTO.getImage();
    }
}
