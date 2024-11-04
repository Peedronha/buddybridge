package br.com.buddybridge.core.adocao.service;

import br.com.buddybridge.core.adocao.entity.*;
import br.com.buddybridge.core.adocao.model.AddressDTO;
import br.com.buddybridge.core.adocao.model.AdoptionSubmissionDTO;
import br.com.buddybridge.core.adocao.model.ProfileDTO;
import br.com.buddybridge.core.adocao.model.get.GetAdoptionDTO;
import br.com.buddybridge.core.adocao.model.get.GetAdoptionDetails;
import br.com.buddybridge.core.adocao.repository.AdopterRepository;
import br.com.buddybridge.core.adocao.repository.AdoptionProfileRepository;
import br.com.buddybridge.core.adocao.repository.AdoptionRepository;
import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import br.com.buddybridge.core.animais.animal.repository.AnimalRepository;
import br.com.buddybridge.core.imageuploader.entity.Image;
import br.com.buddybridge.core.imageuploader.service.ImageService;
import br.com.buddybridge.core.imageuploader.service.implementation.ImageServiceImpl;
import br.com.buddybridge.core.usuario.entity.Usuario;
import br.com.buddybridge.core.usuario.service.UsuarioService;
import jakarta.transaction.SystemException;
import lombok.AllArgsConstructor;
import lombok.Generated;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.CompletableFuture;

@Service
@AllArgsConstructor
public class AdoptionService {

    private final AdoptionProfileRepository adoptionProfileRepository;
    private final AdoptionRepository adoptionRepository;
    private final AdopterRepository adopterRepository;
    private final AnimalRepository animalRepository;
    private final UsuarioService usuarioService;
    private  final ImageService  imageService;


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

            // Validate and convert contacaixa ID
            Long animalId;
            try {
                animalId = !Objects.equals(adoptionDTO.getId_animal(), " ") ? Long.valueOf(adoptionDTO.getId_animal()) : null;
            } catch (NumberFormatException e) {
                throw new SystemException();
            }

            // Fetch the ContaCaixa from the repository
            Optional<AnimalModel> animalModelOptional = animalRepository.findById(animalId);
            if (animalModelOptional.isPresent()) {
                model.setAnimal(animalModelOptional.get());
            } else {
                throw new SystemException("ContaCaixa with ID " + adoptionDTO.getId_animal() + " not found.");
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
                    AdoptionModel adocao = populateAdoption(adoptionDTO, model.get());
                    Usuario user = usuarioService.getCurrentUser();
                    if(user != null) {
                        adocao.setUsuarioAdocao(user);
                    }
                    this.adoptionRepository.save(adocao);
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

        model.setStatus_adocao(AdoptionStatus.ANALYSING);

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

            List<AdoptionProfileModel> models = adoptionProfileRepository.findAllByPendingAdoption();

            // Fetch all adoption profiles with pending status
            for (AdoptionProfileModel model : models) {
                GetAdoptionDTO dto = new GetAdoptionDTO(model);

                // Check if the animal has an associated image
                if (model.getAnimal().getImageName() != null) {
                    // Fetch the image asynchronously
                    byte[] imageBytes = this.imageService.getImage(model.getAnimal().getImageName());
                    String base64Image = Base64.getEncoder().encodeToString(imageBytes);
                    dto.setImage(base64Image);
                }

                // Add the DTO to the list
                dtos.add(dto);
            }

            return dtos;

        } catch (Exception e) {
            throw new SystemException(String.valueOf(e));
        }
    }

    public List<GetAdoptionDTO> findAllAdoptions() {
        List<GetAdoptionDTO> dtos = new ArrayList<>();
        for (AdoptionModel model: adoptionRepository.findAll()){
            //System.out.println("model existe "+ model.getId_adocao());
            if(model.getAdopter() != null) {
                dtos.add(new GetAdoptionDTO(model));
            }
        };
        return dtos;
    }

    public GetAdoptionDetails findAdoptionById(Long id) throws Exception {
        Optional<AdoptionModel> profileModel = this.adoptionRepository.findById(id);
        return profileModel.map(GetAdoptionDetails::new)
                .orElseThrow(Exception::new);
    }

    public Boolean updateAdoptionRequest(AdoptionSubmissionDTO adoptionDTO, String id) throws SystemException {
        try {
            Optional<AdoptionModel> model = this.adoptionRepository.findById(adoptionDTO.getIdAdocao());
            if (model.isPresent()) {
                model.get().setStatus_adocao(AdoptionStatus.valueOf(adoptionDTO.getStatus_adocao()));
                model.get().setObservacoes(adoptionDTO.getObservacoes());
                this.adoptionRepository.save(model.get());
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

    public List<AdoptionProfileModel> findProfilesByUsuarioAdocaoId(Long usuarioId) {
        return adoptionProfileRepository.findByUsuarioAdocaoId(usuarioId);
    }

}
