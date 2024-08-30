package br.com.buddybridge.core.adocao.repository;

import br.com.buddybridge.core.adocao.model.AdoptionProfileModel;
import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdoptionRepository extends JpaRepository<AdoptionProfileModel, Long> {
    @Query("SELECT a FROM AnimalModel a JOIN a.adoptionProfile ap WHERE ap.status_adocao = 'PENDING'")
    List<AnimalModel> findAllByPendingAdoption();
}
