package br.com.buddybridge.core.adocao.model;

import br.com.buddybridge.core.adocao.entity.AdoptionProfileModel;
import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import br.com.buddybridge.core.animais.raca.model.RaceDTO;
import br.com.buddybridge.core.animais.tipo.entity.TypeModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDTO {
    private Long id_perfil_adocao;
    private String id_adocao;
    private String id_animal;
    private Integer priority;
    private String idade;
    private String medical_necessities;
    private String image;
    private LocalDateTime data_criacao;

    public ProfileDTO(AdoptionProfileModel model) {
        this.id_perfil_adocao = model.getId_perfil_adocao();
        this.id_adocao = model.getAdocao() != null ? model.getAdocao().getId_adocao().toString() : null;
        this.id_animal = model.getAnimal() != null ? model.getAnimal().getId_animal().toString() : null;
        this.idade = setIdadeAnimal(model.getAnimal().getData_nascimento());
        this.priority = model.getPriority();
        this.medical_necessities = model.getMedical_necessities();
//        this.image = model.getImage();
        this.data_criacao = model.getData_criacao();
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
