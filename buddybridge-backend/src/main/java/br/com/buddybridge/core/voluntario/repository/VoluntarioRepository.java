package br.com.buddybridge.core.voluntario.repository;


import br.com.buddybridge.core.voluntario.entity.Voluntario;
import org.springframework.data.jpa.repository.JpaRepository;


public interface VoluntarioRepository extends JpaRepository<Voluntario,Long> {


}
