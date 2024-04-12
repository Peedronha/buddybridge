package br.com.buddybridge.core.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "medicalRecord")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MedicalRecordModel {

    /*
    Como vamos montar a lista de historico médico ?

    https://www.baeldung.com/spring-jasper pra gerar um documento com várias fichas
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String doctor;

    private String type;

    private String description;

    private Date date;

    @ManyToOne
    @MapsId
    @JoinColumn(name = "animal_id")
    private AnimalModel animal;
}
