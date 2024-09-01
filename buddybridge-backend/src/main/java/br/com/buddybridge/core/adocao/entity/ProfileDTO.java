package br.com.buddybridge.core.adocao.entity;

import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import br.com.buddybridge.core.animais.raca.model.RaceDTO;
import br.com.buddybridge.core.animais.tipo.entity.TypeModel;
import lombok.Data;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Data
public class ProfileDTO {
    private Long id_adocao;
    private Long id_animal;
    private String nome_animal;
    private Double peso_animal;
    private Double comprimento_animal;
    private String idade;
    private String raca_animal;
    private String tipo_animal;
    private String genero_animal;
    private String localizacao_animal;
    private Integer priority;
    private String image;
    private String medical_necessities;

    public ProfileDTO(AnimalModel model) {
        this.id_animal = model.getId_animal();
        this.nome_animal = model.getNome_animal();
        this.peso_animal = model.getPeso_animal();
        this.comprimento_animal = model.getComprimento_animal();
        this.idade = setIdadeAnimal(model.getData_nascimento());
        this.raca_animal = model.getRace().getName();
        this.tipo_animal = model.getType().getName();
        this.genero_animal = formatGender(model.getGenero_animal());
        this.localizacao_animal = model.getLocalizacao_animal();
    }

    private static final Map<String, String> genderMap = new HashMap<>();

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

    static {
        genderMap.put("Female", "Fêmea");
        genderMap.put("Male", "Macho");
    }

    public String formatGender(String genero_animal) {
        return genderMap.getOrDefault(genero_animal, "Unknown");
    }
}