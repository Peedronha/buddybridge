package br.com.buddybridge.core.adocao.service;

import br.com.buddybridge.core.adocao.entity.AdoptionStatus;
import br.com.buddybridge.core.adocao.model.AdoptionSubmissionDTO;
import br.com.buddybridge.core.adocao.model.ProfileDTO;
import br.com.buddybridge.core.adocao.entity.AdoptionModel;
import br.com.buddybridge.core.adocao.entity.AdoptionProfileModel;
import br.com.buddybridge.core.adocao.repository.AdoptionProfileRepository;
import br.com.buddybridge.core.adocao.repository.AdoptionRepository;
import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import br.com.buddybridge.core.animais.animal.repository.AnimalRepository;
import jakarta.transaction.SystemException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AdoptionService {

    private final AdoptionProfileRepository adoptionProfileRepository;
    private final AdoptionRepository adoptionRepository;
    private final AnimalRepository animalRepository;
    public AdoptionProfileModel saveAdoptionProfileRequest(ProfileDTO adoptionDTO) throws SystemException, NumberFormatException {
        try {

            AdoptionProfileModel model = new AdoptionProfileModel(adoptionDTO);

            if(adoptionDTO.getId_adocao().isEmpty()) {
                model.setAdocao(this.adoptionRepository.save(new AdoptionModel(AdoptionStatus.PENDING)));
            }

            Optional<AnimalModel> animalModelOptional = animalRepository.findById(Long.valueOf(adoptionDTO.getId_animal()));

            if (animalModelOptional.isPresent()) {
                model.setAnimal(animalModelOptional.get());
            } else {
                throw new SystemException("AnimalModel with ID " + adoptionDTO.getId_animal() + " not found.");
            }
            model.setData_criacao(LocalDateTime.now());

            return adoptionProfileRepository.save(model);
        } catch (NumberFormatException e) {
            throw new NumberFormatException("Invalid animal ID format: " + adoptionDTO.getId_animal());
        } catch (Exception e) {
            throw new SystemException("An error occurred while saving the adoption profile: " + e.getMessage());
        }
    }

//        public Boolean saveAdoptionRequest(AdoptionSubmissionDTO adoptionDTO) throws SystemException {
//        try {
//            adoptionRepository.save(new AdoptionProfileModel(adoptionDTO));
//        } catch (Exception e) {
//            throw new SystemException(String.valueOf(e));
//        }
//            return null;
//        }

    public void deleteAdoptionProfile(Long id) {
        this.adoptionProfileRepository.deleteById(id);
    }

    public boolean existsByIdPerfilAdocao(Long id) {
        return adoptionProfileRepository.existsById(id);
    }

    public List<ProfileDTO> findAllAdoptionProfiles() {
        List<ProfileDTO> dtos = new ArrayList<>();
        for (AdoptionProfileModel model: adoptionProfileRepository.findAll()) {
            dtos.add(new ProfileDTO(model));
        }
        return dtos;
    }

    public ProfileDTO findAdoptionProfileModelById(Long id) throws Exception {
        Optional<AdoptionProfileModel> profileModel = this.adoptionProfileRepository.findById(id);
        return profileModel.map(ProfileDTO::new)
                .orElseThrow(Exception::new);
    }

    public List<ProfileDTO> AnimalsByAdoptionPendingStatus() throws SystemException {
        try {
            List<ProfileDTO> dtos = new ArrayList<>();
            for (AdoptionProfileModel model: adoptionProfileRepository.findAllByPendingAdoption()){
                dtos.add(new ProfileDTO(model));
            };
            return dtos;

        } catch (Exception e) {
            throw new SystemException(String.valueOf(e));
        }

    }

//    public Boolean updateAdoptionRequest(AdoptionSubmissionDTO adoptionDTO, String id) {
//        if (adoptionRepository.existsById(Long.valueOf(id))) {
//            AdoptionModel model = adoptionRepository.findById(Long.valueOf(id)).orElse(null);
//            if (model != null) {
//                model.setStatus_adocao(adoptionDTO.getStatus_adocao());
//                model.setDescription(adoptionDTO.getDescripton());
//                adoptionRepository.save(model);
//                return true;
//            }
//        }
//        return false;
//    }

}
