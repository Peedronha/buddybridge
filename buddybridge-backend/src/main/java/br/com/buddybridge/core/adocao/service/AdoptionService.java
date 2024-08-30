package br.com.buddybridge.core.adocao.service;

import br.com.buddybridge.core.adocao.entity.AdoptionDTO;
import br.com.buddybridge.core.adocao.entity.GetAdoptionProfileDTO;
import br.com.buddybridge.core.adocao.entity.PostAdoptionProfileDTO;
import br.com.buddybridge.core.adocao.entity.ProfileDTO;
import br.com.buddybridge.core.adocao.model.AdoptionProfileModel;
import br.com.buddybridge.core.adocao.repository.AdoptionRepository;
import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import br.com.buddybridge.core.animais.animal.model.GetAnimalDTO;
import br.com.buddybridge.core.animais.animal.repository.AnimalRepository;
import jakarta.transaction.SystemException;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AdoptionService {
    private AdoptionRepository adoptionRepository;
    private AnimalRepository animalRepository;
    public GetAdoptionProfileDTO findAdoptionProfileModelById(Long id) throws Exception {
        Optional<AdoptionProfileModel> profileModel = this.adoptionRepository.findById(id);
        return profileModel.map(GetAdoptionProfileDTO::new)
                .orElseThrow(Exception::new);
    }

    public AdoptionProfileModel saveAdoptionRequest(AdoptionDTO adoptionDTO) throws SystemException {
        try {
            return adoptionRepository.save(new AdoptionProfileModel(adoptionDTO));
        } catch (Exception e) {
            throw new SystemException(String.valueOf(e));
        }
    }

    public void deleteAdoption(Long id) {
        adoptionRepository.deleteById(id);
    }

    public boolean existsByIdAdocao(Long id) {
        return adoptionRepository.existsById(id);
    }

    public List<GetAdoptionProfileDTO> findAll() {
        List<GetAdoptionProfileDTO> dtos = new ArrayList<>();
        for (AdoptionProfileModel model: adoptionRepository.findAll())
        {
            dtos.add(new GetAdoptionProfileDTO(model));
        };
        return dtos;
    }

    public AdoptionProfileModel saveAdoptionProfileRequest(PostAdoptionProfileDTO adoptionDTO) throws SystemException, NumberFormatException {
        try {
            AdoptionProfileModel model = new AdoptionProfileModel(adoptionDTO);

            Optional<AnimalModel> animalModelOptional = animalRepository.findById(Long.valueOf(adoptionDTO.getId_animal()));

            if (animalModelOptional.isPresent()) {
                model.setId_animal(animalModelOptional.get());
            } else {
                throw new SystemException("AnimalModel with ID " + adoptionDTO.getId_animal() + " not found.");
            }

            return adoptionRepository.save(model);
        } catch (NumberFormatException e) {
            throw new NumberFormatException("Invalid animal ID format: " + adoptionDTO.getId_animal());
        } catch (Exception e) {
            throw new SystemException("An error occurred while saving the adoption profile: " + e.getMessage());
        }
    }

    public List<ProfileDTO> AnimalsByProfileStatus() {
        List<ProfileDTO> dtos = new ArrayList<>();
        for (AnimalModel model: adoptionRepository.findAllByPendingAdoption())
        {
            AdoptionProfileModel profileModel = adoptionRepository.findAdoptionProfilesByAnimalId(model.getId_animal());

            ProfileDTO dto = new ProfileDTO(model);
            dto.setImage(profileModel.getImage());
            dto.setMedical_necessities(profileModel.getMedical_necessities());
            dto.setPriority(profileModel.getPriority());
            dtos.add(dto);
        };
        return  dtos;
    }
}
