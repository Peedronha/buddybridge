package br.com.buddybridge.core.adocao.service;

import br.com.buddybridge.core.adocao.model.AdoptionSubmissionDTO;
import br.com.buddybridge.core.adocao.model.GetAdoptionProfileDTO;
import br.com.buddybridge.core.adocao.model.ProfileDTO;
import br.com.buddybridge.core.adocao.entity.AdoptionModel;
import br.com.buddybridge.core.adocao.entity.AdoptionProfileModel;
import br.com.buddybridge.core.adocao.entity.AdoptionStatus;
import br.com.buddybridge.core.adocao.repository.AdoptionProfileRepository;
import br.com.buddybridge.core.adocao.repository.AdoptionRepository;
import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import br.com.buddybridge.core.animais.animal.repository.AnimalRepository;
import jakarta.transaction.SystemException;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AdoptionService {

    private final AdoptionProfileRepository adoptionProfileRepository;
    private final AdoptionRepository adoptionRepository;
    private final AnimalRepository animalRepository;

    public GetAdoptionProfileDTO findAdoptionProfileModelById(Long id) throws SystemException {
        return adoptionProfileRepository.findById(id)
                .map(GetAdoptionProfileDTO::new)
                .orElseThrow(() -> new SystemException("Adoption profile not found"));
    }

    public AdoptionProfileModel saveAdoptionProfileRequest(PostAdoptionProfileDTO adoptionDTO) throws SystemException {
        try {
            AdoptionProfileModel model = new AdoptionProfileModel(adoptionDTO);

            Optional<AnimalModel> animalModelOptional = animalRepository.findById(Long.valueOf(adoptionDTO.getId_animal()));
            if (animalModelOptional.isPresent()) {
                model.setId_animal(animalModelOptional.get());
            } else {
                throw new SystemException("AnimalModel with ID " + adoptionDTO.getId_animal() + " not found.");
            }

            return adoptionProfileRepository.save(model);
        } catch (NumberFormatException e) {
            throw new SystemException("Invalid animal ID format: " + adoptionDTO.getId_animal(), e);
        } catch (Exception e) {
            throw new SystemException("An error occurred while saving the adoption profile: " + e.getMessage(), e);
        }
    }

    @Transactional
    public void deleteAdoptionProfile(Long id) throws SystemException {
        if (adoptionProfileRepository.existsById(id)) {
            adoptionProfileRepository.deleteById(id);
        } else {
            throw new SystemException("Adoption profile not found");
        }
    }

    public boolean existsByIdPerfilAdocao(Long id) {
        return adoptionProfileRepository.existsById(id);
    }

    public List<GetAdoptionProfileDTO> findAll() {
        return adoptionProfileRepository.findAll().stream()
                .map(GetAdoptionProfileDTO::new)
                .collect(Collectors.toList());
    }

    public List<ProfileDTO> AnimalsByAdoptionPendingStatus() {
        return adoptionProfileRepository.findByStatusAdocao(AdoptionStatus.PENDING).stream()
                .map(profile -> {
                    ProfileDTO dto = new ProfileDTO(profile.getId_animal());
                    dto.setImage(profile.getImage());
                    dto.setMedical_necessities(profile.getMedical_necessities());
                    dto.setPriority(profile.getPriority());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public Boolean saveAdoptionRequest(AdoptionSubmissionDTO adoptionDTO) throws SystemException {
        try {
            AdoptionModel model = new AdoptionModel(adoptionDTO);

            Optional<AnimalModel> animalModelOptional = animalRepository.findById(Long.valueOf(adoptionDTO.getId_animal()));
            if (animalModelOptional.isPresent()) {
                model.setIdAnimal(animalModelOptional.get());
            } else {
                throw new SystemException("AnimalModel with ID " + adoptionDTO.getId_animal() + " not found.");
            }

            adoptionRepository.save(model);
            return true;
        } catch (NumberFormatException e) {
            throw new SystemException("Invalid animal ID format: " + adoptionDTO.getId_animal(), e);
        } catch (Exception e) {
            throw new SystemException("An error occurred while saving the adoption request: " + e.getMessage(), e);
        }
    }

    public Boolean updateAdoptionRequest(AdoptionSubmissionDTO adoptionDTO, String id) throws SystemException {
        try {
            Long adoptionId = Long.valueOf(id);
            if (adoptionRepository.existsById(adoptionId)) {
                AdoptionModel model = adoptionRepository.findById(adoptionId)
                        .orElseThrow(() -> new SystemException("Adoption not found"));
                model.setStatus_adocao(adoptionDTO.getStatus_adocao());
                model.setDescription(adoptionDTO.getDescription()); // Fix typo in field name
                adoptionRepository.save(model);
                return true;
            }
            return false;
        } catch (NumberFormatException e) {
            throw new SystemException("Invalid ID format: " + id, e);
        } catch (Exception e) {
            throw new SystemException("An error occurred while updating the adoption request: " + e.getMessage(), e);
        }
    }
}
