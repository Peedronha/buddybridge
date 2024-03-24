package br.com.buddybridge.core.service;

import br.com.buddybridge.core.model.MedicalRecordModel;
import br.com.buddybridge.core.repository.MedicalRecordRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class MedicalRecordService {

    private MedicalRecordRepository medicalRecordRepository;

    @Transactional(readOnly = true)
    public List<MedicalRecordModel> findAll() {
        return medicalRecordRepository.findAll();
    }
    @Transactional
    public void saveMedicalRecordModel(MedicalRecordModel medicalRecordModel) {
        medicalRecordRepository.save(medicalRecordModel);
    }
    @Transactional
    public Optional<MedicalRecordModel> findMedicalRecordModelById(Long id) {
        return medicalRecordRepository.findById(id);
    }
    @Transactional
    public void deleteMedicalRecordModel(Long id) {
        medicalRecordRepository.deleteById(id);
    }
}
