package br.com.buddybridge.core.animais.entity;

import br.com.buddybridge.core.animais.model.AnimalDto;
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


    public AnimalModel(AnimalDto animalDto) {
        this.id_animal = animalDto.getIdAnimal();
        this.nome_animal = animalDto.getNomeAnimal();
        this.raca = animalDto.getRaca();
        this.idade = animalDto.getIdade();
        this.peso_animal = animalDto.getPesoAnimal();
        this.comprimento_animal = animalDto.getComprimentoAnimal();
        this.data_resgate = LocalDate.parse(animalDto.getDataResgate());
    }

}
