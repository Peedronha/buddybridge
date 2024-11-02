package br.com.buddybridge.core.animais.animal.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AnimalRescueAdoptionDTO {
    private Integer mes;
    private Long totalResgatados;
    private Long totalAdotados;
}
