package br.com.buddybridge.core.repository;

import br.com.buddybridge.core.model.AdopterModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdopterRepository extends JpaRepository<AdopterModel, Long> {
}
