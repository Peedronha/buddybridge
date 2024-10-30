package br.com.buddybridge.core.historico.service;

import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import br.com.buddybridge.core.animais.animal.repository.AnimalRepository;
import br.com.buddybridge.core.historico.model.MedicalHistoryModel;
import br.com.buddybridge.core.historico.model.dto.MedicalProfileDTO;
import br.com.buddybridge.core.historico.repository.MedicalHistoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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

            if (medicalDTO.getId() != null) {
                model.setId(medicalDTO.getId());
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

    public List<MedicalHistoryModel> findAllMedicalProfiles(){
        return medicalHistoryRepository.findAll();
    }

    public MedicalHistoryModel findMedicalProfileById(Long id){

        Optional<MedicalHistoryModel> model = medicalHistoryRepository.findById(id);

        return model.orElse(null);
    }

    public void deleteMedicalProfile(Long id) throws RuntimeException{
        try {
            medicalHistoryRepository.deleteById(id);
        }catch (RuntimeException e){
            throw new RuntimeException("Erro ao deletar o histórico médico", e);
        }
    }

}
