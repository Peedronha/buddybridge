package br.com.buddybridge.core.usuario.repository;

import br.pucbr.pancake.usuario.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario,Long> {


}
