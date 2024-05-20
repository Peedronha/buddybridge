package br.com.buddybridge.core.animais.animal.model;


import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class AnimalDto {

    private Long id_animal;
    private String nome_animal;
    private String raca;
    private Integer idade;
    private Double peso_animal;
    private Double comprimento_animal;
    private String data_resgate;

    public AnimalDto(AnimalModel animalModel) {
        this.id_animal = animalModel.getId_animal();
        this.nome_animal = animalModel.getNome_animal();
        this.raca = animalModel.getRaca();
        this.idade = animalModel.getIdade();
        this.peso_animal = animalModel.getPeso_animal();
        this.comprimento_animal = animalModel.getComprimento_animal();
        this.data_resgate = animalModel.getData_resgate().toString();
    }
}
