package br.com.buddybridge.core.animais.tipo.entity;

import br.com.buddybridge.core.animais.raca.entity.RacaModel;
import br.com.buddybridge.core.animais.tipo.model.TypeDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "tipo")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TypeModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "type", cascade = CascadeType.ALL)
    private List<RacaModel> races;

    public TypeModel(TypeDTO typeDTO) {
        this.name = typeDTO.getName();
    }
}
