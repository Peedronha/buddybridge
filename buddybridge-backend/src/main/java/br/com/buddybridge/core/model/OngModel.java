package br.com.buddybridge.core.model;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "ONGs")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OngModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mission;

    private String animalTypes;

    private String name;

    private Date creationDate;

    private String password;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "ong", cascade = CascadeType.ALL)
    private List<AnimalModel> animalList;


    public OngModel(long l, String savePets, String s, String bestPaws, Date date) {

    }
}
