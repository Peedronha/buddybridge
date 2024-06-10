package br.com.buddybridge.core.animais.animal.model;

import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;

@NoArgsConstructor
@Getter
@Setter
public class GetAnimalDTO {
    private Long id_animal;
    private String nome_animal;
    private Double peso_animal;
    private Double comprimento_animal;
    private String idade;
    private String data_resgate;
    private String data_nascimento;
    private String raca_animal;
    private String tipo_animal;
    public GetAnimalDTO(AnimalModel animalModel) {
        this.id_animal = animalModel.getId_animal();
        this.nome_animal = animalModel.getNome_animal();
        this.peso_animal = animalModel.getPeso_animal();
        this.comprimento_animal = animalModel.getComprimento_animal();

        this.data_resgate = formatLocalDate(animalModel.getData_resgate());
        this.data_nascimento = formatLocalDate(animalModel.getData_nascimento());
        this.idade = setIdadeAnimal(animalModel.getData_nascimento());

        this.raca_animal = animalModel.getRace().getName();
        this.tipo_animal = animalModel.getType().getName();
    }
    public String setIdadeAnimal(LocalDate dataNascimento) {
        if ((dataNascimento != null)) {
            Period period = Period.between(dataNascimento, LocalDate.now());
            String idade = period.getYears() +" anos "
                    + period.getMonths() + " meses e "
                    + period.getDays() +" dias";
            return idade;
        }
        return "";
    }
    public String formatLocalDate(LocalDate localDate){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            return localDate.format(formatter);
    }
}
