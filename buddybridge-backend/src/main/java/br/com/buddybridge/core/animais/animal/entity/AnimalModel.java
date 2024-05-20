package br.com.buddybridge.core.animais.animal.entity;

import br.com.buddybridge.core.animais.animal.model.AnimalDto;
import br.com.buddybridge.core.animais.raca.model.RacaModel;
import br.com.buddybridge.core.animais.tipo.model.TypeModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "animais")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AnimalModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_animal")
    private Long id_animal;

    @Column(name = "nome_animal", nullable = false)
    private String nome_animal;

    @Column(name = "raca", nullable = false)
    private String raca;

    @Column(name = "idade")
    private Integer idade;

    @Column(name = "peso_animal")
    private Double peso_animal;

    @Column(name = "comprimento_animal")
    private Double comprimento_animal;

    @Column(name = "data_resgate", nullable = false)
    private LocalDate data_resgate;

    @ManyToOne
    @JoinColumn(name = "id_tipo")
    private TypeModel type;

    @ManyToOne
    @JoinColumn(name = "id_raca")
    private RacaModel race;


    public AnimalModel(AnimalDto animalDto) {
        this.nome_animal = animalDto.getNome_animal();
        this.raca = animalDto.getRaca();
        this.idade = animalDto.getIdade();
        this.peso_animal = animalDto.getPeso_animal();
        this.comprimento_animal = animalDto.getComprimento_animal();
        this.data_resgate = LocalDate.parse(animalDto.getData_resgate());
    }
}
