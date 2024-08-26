package br.com.buddybridge.core.adocao.controller;


import br.com.buddybridge.core.adocao.entity.AdoptionDTO;
import br.com.buddybridge.core.adocao.entity.GetAdoptionProfileDTO;
import br.com.buddybridge.core.adocao.entity.PostAdoptionProfileDTO;
import br.com.buddybridge.core.adocao.model.AdoptionProfileModel;
import br.com.buddybridge.core.adocao.service.AdoptionService;
import br.com.buddybridge.core.animais.animal.service.AnimalService;
import br.com.buddybridge.core.util.ExampleExeption;
import jakarta.transaction.SystemException;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("adocao")
public class AdocaoController {

    private AnimalService animalService;
    private AdoptionService adoptionService;

    @GetMapping("/profiles")
    public ResponseEntity<List<GetAdoptionProfileDTO>> getALlAdoptionProfileModels(){
        List<GetAdoptionProfileDTO> adoptionProfiles = new ArrayList<>(this.adoptionService.findAll());
        if (adoptionProfiles.isEmpty()) {
            return new ResponseEntity<>(adoptionProfiles, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ArrayList<> (adoptionProfiles), HttpStatus.OK);
    }

    @PostMapping("/profiles")
    public ResponseEntity<?> insertAdoptionModel(@RequestBody PostAdoptionProfileDTO adoptionDTO){
        try {
            AdoptionProfileModel adoption = this.adoptionService.saveAdoptionProfileRequest(adoptionDTO);

            GetAdoptionProfileDTO responseDTO = new GetAdoptionProfileDTO(adoption);

            return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>("Invalid data: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            // Handle other exceptions
            return new ResponseEntity<>("An error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/profiles/{id}")
    public ResponseEntity<GetAdoptionProfileDTO> getAdoptionModelById(@PathVariable Long id) throws Exception {
        try {
            GetAdoptionProfileDTO model = this.adoptionService.findAdoptionProfileModelById(id);
            return new ResponseEntity<>(model, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/profiles")
    public ResponseEntity<AdoptionDTO> updateAdoptionModel(@RequestBody AdoptionDTO adoptionDTO) throws SystemException, ExampleExeption {
        if(this.adoptionService.existsByIdAdocao(Long.valueOf(adoptionDTO.getId_adocao()))) {
            this.adoptionService.saveAdoptionRequest(adoptionDTO);
            return new ResponseEntity<>(adoptionDTO, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    @DeleteMapping("/profiles/{id}")
    public ResponseEntity<Boolean> deleteAdoptionProfile(@PathVariable Long id){
        if (this.adoptionService.existsByIdAdocao(id)){

            this.adoptionService.deleteAdoption(id);

            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
