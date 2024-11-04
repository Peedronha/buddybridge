package br.com.buddybridge.core.historico.service;

import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import br.com.buddybridge.core.animais.animal.repository.AnimalRepository;
import br.com.buddybridge.core.historico.model.MedicalHistoryModel;
import br.com.buddybridge.core.historico.model.dto.MedicalProfileDTO;
import br.com.buddybridge.core.historico.repository.MedicalHistoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class MedicalHistoryService {

    private MedicalHistoryRepository medicalHistoryRepository;
    private AnimalRepository animalRepository;
    public MedicalHistoryModel saveMedicalProfile(MedicalProfileDTO medicalDTO) throws RuntimeException{
        try {
            MedicalHistoryModel model= new MedicalHistoryModel();

            if (medicalDTO.getMedicalReportId() != null) {
                model.setMedicalReportId(medicalDTO.getMedicalReportId());
            }

            AnimalModel animal = animalRepository.findById(medicalDTO.getAnimalId())
                    .orElseThrow(() -> new RuntimeException("Animal not found"));

            model.setAnimal(animal);

            model.setDescription(medicalDTO.getDescription());
            model.setDoctor(medicalDTO.getDoctor());
            model.setType(medicalDTO.getType());
            model.setDate(medicalDTO.getDate());
            model.setNotes(medicalDTO.getNotes());
            model.setReturnDate(medicalDTO.getReturnDate());

            medicalHistoryRepository.save(model);

            return model;
        }catch (Exception e){
            throw new RuntimeException("Erro ao salvar o histórico médico", e);
        }
    }

    public Boolean existsById(Long id){
        return medicalHistoryRepository.existsById(id);
    }

    public List<MedicalProfileDTO> findAllMedicalProfiles(){
        
        List<MedicalHistoryModel> list = medicalHistoryRepository.findAll();

        if (!CollectionUtils.isEmpty(list)) {
            List<MedicalProfileDTO> medicalProfileDTOS = new ArrayList<>();
            for (MedicalHistoryModel medicalHistoryModel : list) {
                MedicalProfileDTO medicalProfileDTO = medicalProfileDTOPopulator(medicalHistoryModel);

                medicalProfileDTOS.add(medicalProfileDTO);
            }
            return medicalProfileDTOS;
        }

        return null;
    }

    public List<MedicalProfileDTO> getAllMedicalProfilesByAnimalId(Long id){

        List<MedicalHistoryModel> list = medicalHistoryRepository.findMedicalHistoriesByAnimalId(id);

        if (!CollectionUtils.isEmpty(list)) {
            List<MedicalProfileDTO> medicalProfileDTOS = new ArrayList<>();
            for (MedicalHistoryModel medicalHistoryModel : list) {
                MedicalProfileDTO medicalProfileDTO = medicalProfileDTOPopulator(medicalHistoryModel);
                medicalProfileDTOS.add(medicalProfileDTO);
            }
            return medicalProfileDTOS;
        }

        return null;
    }

    private static MedicalProfileDTO medicalProfileDTOPopulator(MedicalHistoryModel medicalHistoryModel) {
        MedicalProfileDTO medicalProfileDTO = new MedicalProfileDTO();

        medicalProfileDTO.setMedicalReportId(medicalHistoryModel.getMedicalReportId());
        medicalProfileDTO.setDescription(medicalHistoryModel.getDescription());
        medicalProfileDTO.setDoctor(medicalHistoryModel.getDoctor());
        medicalProfileDTO.setType(medicalHistoryModel.getType());
        medicalProfileDTO.setDate(medicalHistoryModel.getDate());
        medicalProfileDTO.setNotes(medicalHistoryModel.getNotes());
        medicalProfileDTO.setReturnDate(medicalHistoryModel.getReturnDate());
        medicalProfileDTO.setAnimalId(medicalHistoryModel.getAnimal().getId_animal());

        return medicalProfileDTO;
    }

    public MedicalProfileDTO findMedicalProfileById(Long id){

        Optional<MedicalHistoryModel> model = medicalHistoryRepository.findById(id);

        return model.map(MedicalHistoryService::medicalProfileDTOPopulator).orElse(null);

    }

    public void deleteMedicalProfile(Long id) throws RuntimeException{
        try {
            medicalHistoryRepository.deleteById(id);
        }catch (RuntimeException e){
            throw new RuntimeException("Erro ao deletar o histórico médico", e);
        }
    }


}
