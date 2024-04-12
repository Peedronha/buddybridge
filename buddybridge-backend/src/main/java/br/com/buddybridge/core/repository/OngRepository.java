package br.com.buddybridge.core.repository;

import br.com.buddybridge.core.model.OngModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OngRepository extends JpaRepository<OngModel, Long> {
}