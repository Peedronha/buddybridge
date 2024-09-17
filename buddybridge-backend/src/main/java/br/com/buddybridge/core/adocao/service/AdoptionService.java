package br.com.buddybridge.core.adocao.service;

import br.com.buddybridge.core.adocao.entity.*;
import br.com.buddybridge.core.adocao.model.AddressDTO;
import br.com.buddybridge.core.adocao.model.AdoptionSubmissionDTO;
import br.com.buddybridge.core.adocao.model.ProfileDTO;
import br.com.buddybridge.core.adocao.model.get.GetAdoptionDTO;
import br.com.buddybridge.core.adocao.repository.AdopterRepository;
import br.com.buddybridge.core.adocao.repository.AdoptionProfileRepository;
import br.com.buddybridge.core.adocao.repository.AdoptionRepository;
import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import br.com.buddybridge.core.animais.animal.repository.AnimalRepository;
import jakarta.transaction.SystemException;
import lombok.AllArgsConstructor;
import lombok.Generated;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AdoptionService {

    private final AdoptionProfileRepository adoptionProfileRepository;
    private final AdoptionRepository adoptionRepository;
    private final AdopterRepository adopterRepository;
    private final AnimalRepository animalRepository;
//    public AdoptionProfileModel saveAdoptionProfileRequest(ProfileDTO adoptionDTO) throws SystemException, NumberFormatException {
//        try {
//            AdoptionProfileModel model = new AdoptionProfileModel(adoptionDTO);
//
//            if (adoptionDTO.getId_adocao().isEmpty()) {
//                    AdoptionModel adoptionModel = new AdoptionModel(AdoptionStatus.PENDING);
//                    model.setAdocao(this.adoptionRepository.save(adoptionModel));
//                }
//
//                Optional<AnimalModel> animalModelOptional = animalRepository.findById(Long.valueOf(adoptionDTO.getId_animal()));
//
//                if (animalModelOptional.isPresent()) {
//                    model.setAnimal(animalModelOptional.get());
//                } else {
//                    throw new SystemException("AnimalModel with ID " + adoptionDTO.getId_animal() + " not found.");
//                }
//                model.setData_criacao(LocalDateTime.now());
//
//            return adoptionProfileRepository.save(model);
//        } catch (NumberFormatException e) {
//            throw new NumberFormatException("Invalid animal ID format: " + adoptionDTO.getId_animal());
//        } catch (Exception e) {
//            throw new SystemException("An error occurred while saving the adoption profile: " + e.getMessage());
//        }
//    }
public AdoptionProfileModel saveAdoptionProfileRequest(ProfileDTO adoptionDTO) throws SystemException {
    try {
        AdoptionProfileModel model;
        boolean isNew = adoptionDTO.getId_perfil_adocao() == null;

        if (isNew) {
            model = new AdoptionProfileModel(adoptionDTO);

            // Create a new AdoptionModel if id_adocao is empty
            if (adoptionDTO.getId_adocao().isEmpty()) {
                AdoptionModel adoptionModel = new AdoptionModel(AdoptionStatus.PENDING);
                model.setAdocao(this.adoptionRepository.save(adoptionModel));
            }

            // Validate and convert animal ID
            Long animalId;
            try {
                animalId = !Objects.equals(adoptionDTO.getId_animal(), " ") ? Long.valueOf(adoptionDTO.getId_animal()) : null;
            } catch (NumberFormatException e) {
                throw new SystemException();
            }

            // Fetch the AnimalModel from the repository
            Optional<AnimalModel> animalModelOptional = animalRepository.findById(animalId);
            if (animalModelOptional.isPresent()) {
                model.setAnimal(animalModelOptional.get());
            } else {
                throw new SystemException("AnimalModel with ID " + adoptionDTO.getId_animal() + " not found.");
            }

            // Set the creation date
            model.setData_criacao(LocalDateTime.now());

        } else {
            // Handle PUT (Update Existing)
            Optional<AdoptionProfileModel> existingModelOptional = adoptionProfileRepository.findById(adoptionDTO.getId_perfil_adocao());
            if (existingModelOptional.isPresent()) {
                model = existingModelOptional.get();
                // Update fields from DTO
                model.setPriority(adoptionDTO.getPriority());
                model.setMedical_necessities(adoptionDTO.getMedical_necessities());
            } else {
                throw new SystemException("AdoptionProfileModel with ID " + adoptionDTO.getId_perfil_adocao() + " not found for update.");
            }
        }

        // Save and return the model
        return adoptionProfileRepository.save(model);

    } catch (SystemException e) {
        throw e; // Re-throw the custom exception for higher-level handling
    } catch (Exception e) {
        throw new SystemException();
    }
}



    public Boolean saveAdoptionRequest(AdoptionSubmissionDTO adoptionDTO) throws SystemException {
            try {
                Optional<AdoptionModel> model = this.adoptionRepository.findById(adoptionDTO.getIdAdocao());
                if (model.isPresent()) {
                    this.adoptionRepository.save(populateAdoption(adoptionDTO, model.get()));
                } else {
                    throw new SystemException("AdoptionModel with ID " + adoptionDTO.getIdAdocao() + " not found.");
                }
            } catch (NumberFormatException e) {
                throw new NumberFormatException("Invalid adoption ID format: " + adoptionDTO.getIdAdocao());
            } catch (Exception e) {
                throw new SystemException("An error occurred while saving the adoption: " + e.getMessage());
            }
            return true;
        }

    private AdoptionModel populateAdoption(AdoptionSubmissionDTO adoptionDTO, AdoptionModel model) {
        AddressModel addressModel = new AddressModel(new AddressDTO(adoptionDTO));
        AdopterModel adopterModel = new AdopterModel(adoptionDTO);

        adopterModel.setAddress(addressModel);
        adopterModel.setAdocao(model);

        Optional<AdoptionProfileModel> adoptionProfileModel = this.adoptionProfileRepository.findById(adoptionDTO.getIdPerfilAdocao());

        adoptionProfileModel.ifPresent(model::setProfile);

        model.setAdopter(this.adopterRepository.save(adopterModel));

//        model.setStatus_adocao(AdoptionStatus.ANALYSING);

        model.setData_submissao(LocalDateTime.now());
        return model;
    }

    public void deleteAdoptionProfile(Long id) {
        this.adoptionProfileRepository.deleteById(id);
    }

    public boolean existsByIdPerfilAdocao(Long id) {
        return adoptionProfileRepository.existsById(id);
    }

    public List<GetAdoptionDTO> findAllAdoptionProfiles() {
        List<GetAdoptionDTO> dtos = new ArrayList<>();
        for (AdoptionProfileModel model: adoptionProfileRepository.findAll()) {
            dtos.add(new GetAdoptionDTO(model));
        }
        return dtos;
    }

    public ProfileDTO findAdoptionProfileModelById(Long id) throws Exception {
        Optional<AdoptionProfileModel> profileModel = this.adoptionProfileRepository.findById(id);
        return profileModel.map(ProfileDTO::new)
                .orElseThrow(Exception::new);
    }

    public List<GetAdoptionDTO> AnimalsByAdoptionPendingStatus() throws SystemException {
        try {
            List<GetAdoptionDTO> dtos = new ArrayList<>();
            for (AdoptionProfileModel model: adoptionProfileRepository.findAllByPendingAdoption()){
                dtos.add(new GetAdoptionDTO(model));
            };
            return dtos;

        } catch (Exception e) {
            throw new SystemException(String.valueOf(e));
        }

    }

    public List<GetAdoptionDTO> findAllAdoptions() throws SystemException {
        try {
            List<GetAdoptionDTO> dtos = new ArrayList<>();
            for (AdoptionModel model: adoptionRepository.findAll()){
                dtos.add(new GetAdoptionDTO(model));
            };
            return dtos;

        } catch (Exception e) {
            throw new SystemException(String.valueOf(e));
        }
    }

    public GetAdoptionDTO findAdoptionById(Long id) throws Exception {
        Optional<AdoptionModel> profileModel = this.adoptionRepository.findById(id);
        return profileModel.map(GetAdoptionDTO::new)
                .orElseThrow(Exception::new);
    }
}
