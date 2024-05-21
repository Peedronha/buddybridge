package br.com.buddybridge.core.animais.repository;

import br.com.buddybridge.core.animais.entity.AnimalModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalRepository extends JpaRepository<AnimalModel, Long> {

}
