package br.com.buddybridge.core.animais.raca.model;

import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "raca")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RacaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_raca")
    private Long id_raca;

    @ManyToOne
    @JoinColumn(name = "id_tipo", nullable = false)
    private AnimalModel tipo;

    @Column(name = "nome_raca", nullable = false)
    private String nome_raca;
}
