package br.com.buddybridge.core.adocao.repository;

import br.com.buddybridge.core.adocao.entity.AdoptionProfileModel;
import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AdoptionProfileRepository extends JpaRepository<AdoptionProfileModel, Long> {
    @Query("SELECT a FROM AnimalModel a JOIN a.adoptionProfile ap WHERE ap.status_adocao = 'PENDING'")
    List<AnimalModel> findAllByPendingAdoption();

    @Query("SELECT ap FROM AdoptionProfileModel ap WHERE ap.id_animal.id_animal = :idAnimal")
    AdoptionProfileModel findAdoptionProfilesByAnimalId(@Param("idAnimal") Long idAnimal);

}
