package br.com.buddybridge.core.animais.model;


import br.com.buddybridge.core.animais.entity.AnimalModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class AnimalDto {

    private Long idAnimal;
    private String nomeAnimal;
    private String raca;
    private Integer idade;
    private Double pesoAnimal;
    private Double comprimentoAnimal;
    private String dataResgate;

    public AnimalDto(AnimalModel animalModel) {
        this.idAnimal = animalModel.getId_animal();
        this.nomeAnimal = animalModel.getNome_animal();
        this.raca = animalModel.getRaca();
        this.idade = animalModel.getIdade();
        this.pesoAnimal = animalModel.getPeso_animal();
        this.comprimentoAnimal = animalModel.getComprimento_animal();
        this.dataResgate = animalModel.getData_resgate().toString();
    }
}
