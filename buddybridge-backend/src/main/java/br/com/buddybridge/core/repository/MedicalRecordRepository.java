package br.com.buddybridge.core.repository;

import br.com.buddybridge.core.model.MedicalRecordModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicalRecordRepository extends JpaRepository<MedicalRecordModel, Long> {
}
