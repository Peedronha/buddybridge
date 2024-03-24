package br.com.buddybridge.core.repository;

import br.com.buddybridge.core.model.AnimalModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalRepository extends JpaRepository<AnimalModel, Long> {
}
