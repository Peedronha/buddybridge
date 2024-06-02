package br.com.buddybridge.core.animais.animal.repository;

import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalRepository extends JpaRepository<AnimalModel, Long> {

}
