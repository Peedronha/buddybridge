package br.com.buddybridge.core.adocao.repository;

import br.com.buddybridge.core.adocao.entity.AdoptionProfileModel;
import br.com.buddybridge.core.adocao.entity.AdoptionStatus;
import br.com.buddybridge.core.adocao.model.ProfileDTO;
import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AdoptionProfileRepository extends JpaRepository<AdoptionProfileModel, Long> {
    @Query("SELECT a FROM AdoptionProfileModel a JOIN a.adocao ad WHERE ad.status_adocao = 'PENDING'")
    List<AdoptionProfileModel> findAllByPendingAdoption();

    @Query("SELECT ap FROM AdoptionProfileModel ap JOIN ap.adocao a WHERE a.usuarioAdocao.id = :usuarioId")
    List<AdoptionProfileModel> findByUsuarioAdocaoId(@Param("usuarioId") Long usuarioId);

//   @Query("SELECT ap FROM AdoptionProfileModel ap WHERE ap.id_animal.id_animal = :idAnimal")
//   List<ProfileDTO>findAdoptionProfilesByAnimalId(@Param("idAnimal") Long idAnimal);
}
