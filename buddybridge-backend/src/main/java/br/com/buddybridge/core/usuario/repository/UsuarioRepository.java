package br.com.buddybridge.core.usuario.repository;


import br.com.buddybridge.core.usuario.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;


public interface UsuarioRepository extends JpaRepository<Usuario,Long> {

    Optional<Usuario> findByLogin(String login);

}
