package br.com.buddybridge.core.usuario.repository;


import br.com.buddybridge.core.Employee.entity.EmployeeModel;
import br.com.buddybridge.core.usuario.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;


public interface UsuarioRepository extends JpaRepository<Usuario,Long> {

    Optional<Usuario> findByLogin(String login);

    void deleteByUsuarioIdvoluntario(EmployeeModel usuarioIdvoluntario);

    Usuario findByUsuarioIdvoluntario(EmployeeModel employeeModel);
}
