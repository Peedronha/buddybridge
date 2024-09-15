package br.com.buddybridge.core.colaborador.repository;

import br.com.buddybridge.core.colaborador.entity.Colaborador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ColaboradorRepository extends JpaRepository<Colaborador, Long> {

}
