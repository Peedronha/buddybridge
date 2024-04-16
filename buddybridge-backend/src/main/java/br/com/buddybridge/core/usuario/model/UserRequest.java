package br.com.buddybridge.core.usuario.model;

import br.com.buddybridge.core.usuario.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;



@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {

    int id;
    String username;
    String firstname;
    String lastname;
    String country;

}