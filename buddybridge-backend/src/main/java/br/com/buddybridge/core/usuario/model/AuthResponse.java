package br.com.buddybridge.core.usuario.model;

import br.com.buddybridge.core.usuario.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    String token;
    String idUser;
    String login;
    boolean validarEmail;
    boolean valid;

}
