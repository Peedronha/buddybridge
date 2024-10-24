package br.com.buddybridge.core.historico.repository;

import br.com.buddybridge.core.historico.model.MedicalHistoryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicalHistoryRepository extends JpaRepository<MedicalHistoryModel, Long> {
}
