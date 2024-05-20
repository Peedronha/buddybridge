package br.com.buddybridge.core.animais.tipo.model;

import br.com.buddybridge.core.animais.raca.model.RacaModel;
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
    @Column(name = "id_tipo")
    private Long id_tipo;

    @Column(name = "nome_tipo", nullable = false)
    private String name;

    @OneToMany(mappedBy = "tipo", cascade = CascadeType.ALL)
    private List<RacaModel> races;
}
