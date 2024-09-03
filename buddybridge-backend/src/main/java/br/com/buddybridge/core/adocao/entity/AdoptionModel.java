package br.com.buddybridge.core.adocao.entity;

import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "adocao")
public class AdoptionModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_adocao")
    private Long id_adocao;

    @OneToOne
    private AnimalModel id_animal;

    @ManyToOne
    @JoinColumn(name = "id_adotante")
    private AdopterModel adopter;

    private LocalDateTime data_submissao;

    @Embedded
    private AddressModel address;

    @Column(name = "status_adocao")
    @Enumerated(EnumType.STRING)
    private AdoptionStatus status_adocao;

    @Column(name = "priority")
    private Integer priority;

    @Column(name = "medical_necessities")
    private String medical_necessities;

    @Column(name = "image")
    private String image;

    @Column(name = "data_criacao")
    private LocalDateTime data_criacao;
}
