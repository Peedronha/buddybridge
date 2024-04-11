package br.com.buddybridge.core.usuario.repository;


import br.com.buddybridge.core.usuario.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario,Long> {

    Boolean findByEmailUsuarioAndSenhaUsuario(String emailUsuario, String senhaUsuario);
}
