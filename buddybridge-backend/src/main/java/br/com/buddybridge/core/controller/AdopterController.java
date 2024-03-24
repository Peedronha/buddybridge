package br.com.buddybridge.core.controller;

import br.com.buddybridge.core.model.AdopterModel;
import br.com.buddybridge.core.service.AdopterService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("adopter")
public class AdopterController {
    
    private AdopterService adopterService;

    @GetMapping
    public ResponseEntity<List<AdopterModel>> getALlAdopterModels(){
        List<AdopterModel> adopterModels = new ArrayList<>(this.adopterService.findAll());
        if (adopterModels.isEmpty()) {
            return new ResponseEntity<>(adopterModels, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ArrayList<> (adopterModels), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<AdopterModel> insertAdopterModel(@RequestBody AdopterModel adopterModel){
        try{
            this.adopterService.saveAdopterModel(adopterModel);
            return new ResponseEntity<>(adopterModel, HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdopterModel> getAdopterModelById(@PathVariable Long id){
        Optional<AdopterModel> adopterModel = this.adopterService.findAdopterModelById(id);
        return adopterModel.map(model -> new ResponseEntity<>(model, HttpStatus.OK))
                           .orElseGet(() -> new ResponseEntity<>(null,HttpStatus.NOT_FOUND));
    }

    @PutMapping
    public ResponseEntity<AdopterModel> updateAdopterModel(@RequestAttribute Long id,@RequestBody AdopterModel adopterModel){
        if(this.adopterService.findAdopterModelById(id).isPresent()) {
            this.adopterService.saveAdopterModel(adopterModel);
            return new ResponseEntity<>(adopterModel, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteAdopterModel(@PathVariable Long id){
        if (this.adopterService.findAdopterModelById(id).isPresent()){
            this.adopterService.deleteAdopterModel(id);
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
