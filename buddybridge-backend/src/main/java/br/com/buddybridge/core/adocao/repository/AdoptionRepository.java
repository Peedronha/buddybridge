package br.com.buddybridge.core.adocao.repository;

import br.com.buddybridge.core.adocao.entity.AdoptionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdoptionRepository extends JpaRepository<AdoptionModel, Long> {

}
