package br.com.buddybridge.core.adocao.service;

import br.com.buddybridge.core.adocao.entity.AdoptionDTO;
import br.com.buddybridge.core.adocao.entity.GetAdoptionProfileDTO;
import br.com.buddybridge.core.adocao.entity.PostAdoptionProfileDTO;
import br.com.buddybridge.core.adocao.model.AdoptionProfileModel;
import br.com.buddybridge.core.adocao.model.AdoptionStatus;
import br.com.buddybridge.core.adocao.repository.AdoptionRepository;
import br.com.buddybridge.core.animais.animal.repository.AnimalRepository;
import br.com.buddybridge.core.animais.animal.service.AnimalService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.SystemException;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
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

    public AdoptionProfileModel saveAdoptionProfileRequest(PostAdoptionProfileDTO adoptionDTO) throws SystemException {
        try {
            AdoptionProfileModel model = new AdoptionProfileModel(adoptionDTO);

            model.setId_animal(this.animalRepository
                    .getReferenceById(Long.valueOf(adoptionDTO.getId_animal())));

            model.setStatus_adocao(AdoptionStatus.valueOf(adoptionDTO.getStatus_adocao()));

            return adoptionRepository.save(model);
        } catch (DataIntegrityViolationException e) {
            throw new SystemException("Data integrity violation: " + e.getMessage());
        } catch (EntityNotFoundException e) {
            throw new SystemException("Animal not found with id: " + adoptionDTO.getId_animal());
        } catch (Exception e) {
            throw new SystemException("An unexpected error occurred: " + e.getMessage());
        }
    }
}
