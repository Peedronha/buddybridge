package br.com.buddybridge.core.adocao.repository;

import br.com.buddybridge.core.adocao.model.AdoptionProfileModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdoptionRepository extends JpaRepository<AdoptionProfileModel, Long> {
}
