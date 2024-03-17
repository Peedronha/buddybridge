package br.com.buddybridge.core.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "animals")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AnimalModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String priorityScale;

    private String race;

    private Integer age;

    private String sex;

    @OneToMany(mappedBy = "animal", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private List<MedicalRecordModel> medicalReportList;

    @OneToOne(mappedBy = "adopter")
    private AdopterModel adopter;
}
