package br.com.buddybridge.core.historico.model;

import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import br.com.buddybridge.core.historico.model.dto.MedicalProfileDTO;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@Entity(name = "historico-medico")
public class MedicalHistoryModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "animal_id", referencedColumnName = "id_animal")
    private AnimalModel animal;

    private LocalDate date;
    private LocalDate returnDate;
    private String description;
    private String type;
    private String doctor;
    private String notes;

    public MedicalHistoryModel(MedicalProfileDTO medicalDTO) {
        this.setId(medicalDTO.getId());
        this.setDate(medicalDTO.getDate());
        this.setDescription(medicalDTO.getDescription());
        this.setType(medicalDTO.getType());
        this.setNotes(medicalDTO.getNotes());
        this.setDoctor(medicalDTO.getDoctor());
    }
}