package br.com.buddybridge.core.historico.controller;

import br.com.buddybridge.core.historico.model.MedicalHistoryModel;
import br.com.buddybridge.core.historico.model.dto.MedicalProfileDTO;
import br.com.buddybridge.core.historico.service.MedicalHistoryService;
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
@RequestMapping("medical")
public class MedicalHistoryController {

    private final MedicalHistoryService medicalHistoryService;
    @PostMapping("/register")
    public ResponseEntity<?> insertMedicalProfile(@RequestBody MedicalProfileDTO medicalDTO) {
        try {
            MedicalHistoryModel medicalHistoryModel = medicalHistoryService.saveMedicalProfile(medicalDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(new MedicalHistoryModel(medicalDTO));
        } catch (DataIntegrityViolationException e) {
            return buildErrorResponse("Invalid data: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return buildErrorResponse("An error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint to update an existing adoption profile
    @PutMapping("/update")
    public ResponseEntity<?> updateMedicalProfile(@RequestBody MedicalProfileDTO medicalDTO) throws SystemException {
        if (medicalHistoryService.existsById(medicalDTO.getMedicalReportId())) {
            medicalHistoryService.saveMedicalProfile(medicalDTO);
            return ResponseEntity.ok(HttpStatus.CREATED);
        }
        return buildErrorResponse("Adoption profile not found", HttpStatus.NOT_FOUND);
    }

    // Endpoint to get all adoption profiles
    @GetMapping("/medical-profiles")
    public ResponseEntity<List<MedicalProfileDTO>> getAllMedicalProfiles() {
        List<MedicalProfileDTO> models = medicalHistoryService.findAllMedicalProfiles();
        if (models.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(models);
    }

    // Endpoint to get an adoption profile by ID
    @GetMapping("/medical-profiles/{id}")
    public ResponseEntity<MedicalProfileDTO> getMedicalProfileById(@PathVariable Long id) {
        try {
            MedicalProfileDTO model = medicalHistoryService.findMedicalProfileById(id);
            return ResponseEntity.ok(model);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
//            return buildErrorResponse("Adoption profile not found: " + e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/animal/{id}")
    public ResponseEntity<List<MedicalProfileDTO>> getAllMedicalProfilesByAnimalId(@PathVariable Long id) {
        List<MedicalProfileDTO> models = medicalHistoryService.getAllMedicalProfilesByAnimalId(id);
        if (models.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(models);
    }

    // Endpoint to delete an adoption profile
    @Transactional
    @DeleteMapping("/medical-profiles/{id}")
    public ResponseEntity<?> deleteAdoptionProfile(@PathVariable Long id) {
        if (medicalHistoryService.existsById(id)) {
            medicalHistoryService.deleteMedicalProfile(id);
            return ResponseEntity.ok(true);
        }
        return buildErrorResponse("Adoption profile not found", HttpStatus.NOT_FOUND);
    }

    // Common error response builder
    private ResponseEntity<String> buildErrorResponse(String message, HttpStatus status) {
        return ResponseEntity.status(status).body(message);
    }



}

