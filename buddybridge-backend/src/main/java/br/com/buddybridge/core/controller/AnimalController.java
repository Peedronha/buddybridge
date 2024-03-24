package br.com.buddybridge.core.controller;

import br.com.buddybridge.core.model.AnimalModel;
import br.com.buddybridge.core.model.AnimalModel;
import br.com.buddybridge.core.service.AnimalService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("animal")
public class AnimalController {

    private AnimalService animalService;

    @GetMapping
    public ResponseEntity<List<AnimalModel>> getALlAnimalModels(){
        List<AnimalModel> animalModels = new ArrayList<>(this.animalService.findAll());
        if (animalModels.isEmpty()) {
            return new ResponseEntity<>(animalModels, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ArrayList<> (animalModels), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<AnimalModel> insertAnimalModel(@RequestBody AnimalModel animalModel){
        try{
            this.animalService.saveAnimalModel(animalModel);
            return new ResponseEntity<>(animalModel, HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnimalModel> getAnimalModelById(@PathVariable Long id){
        Optional<AnimalModel> animalModel = this.animalService.findAnimalModelById(id);
        return animalModel.map(model -> new ResponseEntity<>(model, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(null,HttpStatus.NOT_FOUND));
    }

    @PutMapping
    public ResponseEntity<AnimalModel> updateAnimalModel(@RequestAttribute Long id,@RequestBody AnimalModel animalModel){
        if(this.animalService.findAnimalModelById(id).isPresent()) {
            this.animalService.saveAnimalModel(animalModel);
            return new ResponseEntity<>(animalModel, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteAnimalModel(@PathVariable Long id){
        if (this.animalService.findAnimalModelById(id).isPresent()){
            this.animalService.deleteAnimalModel(id);
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
