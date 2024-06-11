package br.com.buddybridge.core.animais.raca.model;

import br.com.buddybridge.core.animais.raca.entity.RacaModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RaceDTO {
    Long id;
    Long id_tipo;
    String name;

}
