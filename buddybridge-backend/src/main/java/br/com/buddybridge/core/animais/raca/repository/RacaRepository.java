package br.com.buddybridge.core.animais.raca.repository;
import br.com.buddybridge.core.animais.raca.entity.RacaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RacaRepository extends JpaRepository<RacaModel, Long> {
    List<RacaModel> findByTypeName(String type);
}
