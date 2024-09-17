package br.com.buddybridge.core.adocao.entity;

import br.com.buddybridge.core.adocao.model.AdoptionSubmissionDTO;
import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "adocao")
public class AdoptionModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_adocao")
    private Long id_adocao;

    @OneToOne(mappedBy = "adocao", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn(name = "id_perfil_adocao")
    private AdoptionProfileModel profile;

    @OneToOne
    @JoinColumn(name = "id_adotante")
    private AdopterModel adopter;

    @Column(name = "data_submissao")
    private LocalDateTime data_submissao;

    @Column(name = "status_adocao")
    @Enumerated(EnumType.STRING)
    private AdoptionStatus status_adocao;

    @Column(name = "data_criacao")
    private LocalDateTime data_criacao;

    public AdoptionModel(AdoptionStatus status_adocao) {
        this.status_adocao = status_adocao;
        this.data_criacao = LocalDateTime.now();
    }

    public AdoptionModel(AdoptionSubmissionDTO adoptionDTO) {
    }
}

