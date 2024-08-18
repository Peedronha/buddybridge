package br.com.buddybridge.core.adocao.model;

import br.com.buddybridge.core.adocao.entity.AdoptionDTO;
import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "perfil_adocao")
public class AdoptionProfileModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_adocao")
    private Long id_adocao;

    @ManyToOne
    private AnimalModel id_animal;

    @Column(name = "nome_adotante", nullable = false)
    private String nome_adotante;

    @Column(name = "endereco")
    private String endereco;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "email")
    private String email;

    @Column(name = "descricao_experiencia")
    private String descricao_experiencia;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private AdoptionStatus status;

    @Column(name = "data_submissao")
    private LocalDateTime data_submissao;

    public AdoptionProfileModel(AdoptionDTO adoptionDTO) {
    }
}
