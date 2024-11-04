package br.com.buddybridge.core.historico.repository;

import br.com.buddybridge.core.historico.model.MedicalHistoryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MedicalHistoryRepository extends JpaRepository<MedicalHistoryModel, Long> {

    // Consulta personalizada para buscar fichas médicas pelo ID do animal
    @Query("SELECT m FROM historico_medico m WHERE m.animal.id_animal = :idAnimal")
    List<MedicalHistoryModel> findMedicalHistoriesByAnimalId(@Param("idAnimal") Long idAnimal);
}
