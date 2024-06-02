package br.com.buddybridge.core.animais.raca.entity;

import br.com.buddybridge.core.animais.tipo.entity.TypeModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "raca")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RacaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private TypeModel type;
}
