package br.com.buddybridge.core.adocao.controller;

import br.com.buddybridge.core.adocao.model.AdoptionSubmissionDTO;
import br.com.buddybridge.core.adocao.model.ProfileDTO;
import br.com.buddybridge.core.adocao.entity.AdoptionProfileModel;
import br.com.buddybridge.core.adocao.service.AdoptionService;
import br.com.buddybridge.core.animais.animal.service.AnimalService;
import jakarta.transaction.SystemException;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@AllArgsConstructor
@RequestMapping("adocao")
public class AdoptionController {

    private final AnimalService animalService;
    private final AdoptionService adoptionService;

    // Endpoint to create a new adoption profile
    @PostMapping("/profiles")
    public ResponseEntity<?> insertAdoptionProfile(@RequestBody ProfileDTO adoptionDTO) {
        try {
            AdoptionProfileModel adoption = adoptionService.saveAdoptionProfileRequest(adoptionDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(new ProfileDTO(adoption));
        } catch (DataIntegrityViolationException e) {
            return buildErrorResponse("Invalid data: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return buildErrorResponse("An error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint to update an existing adoption profile
    @PutMapping("/profiles")
    public ResponseEntity<?> updateAdoptionProfile(@RequestBody ProfileDTO adoptionDTO) throws SystemException {
        if (adoptionService.existsByIdPerfilAdocao(adoptionDTO.getId_perfil_adocao())) {
            adoptionService.saveAdoptionProfileRequest(adoptionDTO);
            return ResponseEntity.ok(adoptionDTO);
        }
        return buildErrorResponse("Adoption profile not found", HttpStatus.NOT_FOUND);
    }

    // Endpoint to get all adoption profiles
    @GetMapping("/profiles")
    public ResponseEntity<?> getAllAdoptionProfiles() {
        List<ProfileDTO> adoptionProfiles = adoptionService.findAllAdoptionProfiles();
        if (adoptionProfiles.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(adoptionProfiles);
    }

    // Endpoint to get an adoption profile by ID
    @GetMapping("/profiles/{id}")
    public ResponseEntity<?> getAdoptionProfileById(@PathVariable Long id) {
        try {
            ProfileDTO model = adoptionService.findAdoptionProfileModelById(id);
            return ResponseEntity.ok(model);
        } catch (Exception e) {
            return buildErrorResponse("Adoption profile not found: " + e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint to get adoption profiles with a status of PENDING
    @GetMapping("/profiles/PENDING")
    public ResponseEntity<?> getProfilesByStatusPending() {
        try {
            List<ProfileDTO> model = adoptionService.AnimalsByAdoptionPendingStatus();
            return ResponseEntity.ok(model);
        } catch (Exception e) {
            return buildErrorResponse("An error occurred: " + e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint to delete an adoption profile
    @Transactional
    @DeleteMapping("/profiles/{id}")
    public ResponseEntity<?> deleteAdoptionProfile(@PathVariable Long id) {
        if (adoptionService.existsByIdPerfilAdocao(id)) {
            adoptionService.deleteAdoptionProfile(id);
            return ResponseEntity.ok(true);
        }
        return buildErrorResponse("Adoption profile not found", HttpStatus.NOT_FOUND);
    }
//
//    // Endpoint to create an adoption request
//    @PostMapping("/add")
//    public ResponseEntity<?> createAdoptionIntention(@RequestBody AdoptionSubmissionDTO adoptionDTO) {
//        try {
//            Boolean adoption = adoptionService.saveAdoptionRequest(adoptionDTO);
//            return ResponseEntity.status(HttpStatus.CREATED).body(adoption);
//        } catch (DataIntegrityViolationException e) {
//            return buildErrorResponse("Invalid data: " + e.getMessage(), HttpStatus.BAD_REQUEST);
//        } catch (Exception e) {
//            return buildErrorResponse("An error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    // Endpoint to update an adoption request
//    @PutMapping("/change/{id}")
//    public ResponseEntity<?> updateAdoptionIntention(@RequestBody AdoptionSubmissionDTO adoptionDTO, @PathVariable String id) {
//        try {
//            Boolean adoption = adoptionService.updateAdoptionRequest(adoptionDTO, id);
//            return ResponseEntity.ok(adoption);
//        } catch (DataIntegrityViolationException e) {
//            return buildErrorResponse("Invalid data: " + e.getMessage(), HttpStatus.BAD_REQUEST);
//        } catch (Exception e) {
//            return buildErrorResponse("An error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }


    // Common error response builder
    private ResponseEntity<String> buildErrorResponse(String message, HttpStatus status) {
        return ResponseEntity.status(status).body(message);
    }
}
