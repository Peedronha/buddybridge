package br.com.buddybridge.core.adocao.controller;


import br.com.buddybridge.core.adocao.entity.AdoptionDTO;
import br.com.buddybridge.core.adocao.entity.GetAdoptionDTO;
import br.com.buddybridge.core.adocao.model.AdoptionProfileModel;
import br.com.buddybridge.core.adocao.service.AdoptionService;
import br.com.buddybridge.core.animais.animal.service.AnimalService;
import br.com.buddybridge.core.util.ExampleExeption;
import jakarta.transaction.SystemException;
import lombok.AllArgsConstructor;
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
    public ResponseEntity<List<GetAdoptionDTO>> getALlAdoptionProfileModels(){
        List<GetAdoptionDTO> adoptionProfiles = new ArrayList<>(this.adoptionService.findAll());
        if (adoptionProfiles.isEmpty()) {
            return new ResponseEntity<>(adoptionProfiles, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ArrayList<> (adoptionProfiles), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<AdoptionProfileModel> insertAdoptionModel(@RequestBody AdoptionDTO adoptionDTO){
        try {
            AdoptionProfileModel adoption = this.adoptionService.saveAdoptionRequest(adoptionDTO);
            return new ResponseEntity<>(adoption, HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetAdoptionDTO> getAdoptionModelById(@PathVariable Long id) throws Exception {
        try {
            GetAdoptionDTO model = this.adoptionService.findAdoptionProfileModelById(id);
            return new ResponseEntity<>(model, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping
    public ResponseEntity<AdoptionDTO> updateAdoptionModel(@RequestBody AdoptionDTO adoptionDTO) throws SystemException, ExampleExeption {
        if(this.adoptionService.existsByIdAdocao(adoptionDTO.getId_adocao())) {
            this.adoptionService.saveAdoptionRequest(adoptionDTO);
            return new ResponseEntity<>(adoptionDTO, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteAdoption(@PathVariable Long id){
        if (this.adoptionService.existsByIdAdocao(id)){

            this.adoptionService.deleteAdoption(id);

            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
