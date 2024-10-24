package br.com.buddybridge.core.historico.model.dto;

import lombok.Data;

import java.time.LocalDate;
@Data
public class MedicalProfileDTO {
    private Long id;
    private Long animalId;
    private LocalDate date;
    private String description;
    private String type;
    private String doctor;
    private String notes;
    private LocalDate returnDate;
}
