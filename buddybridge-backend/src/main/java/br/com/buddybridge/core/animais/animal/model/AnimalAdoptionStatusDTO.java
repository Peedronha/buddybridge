package br.com.buddybridge.core.animais.animal.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AnimalAdoptionStatusDTO {
    private long completedAdoptions;
    private long inProgressAdoptions;
    private long pendingAdoptions;
    private long noAdoptionProfile;
}
