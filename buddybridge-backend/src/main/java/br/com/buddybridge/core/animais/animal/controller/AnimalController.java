package br.com.buddybridge.core.animais.animal.controller;

import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import br.com.buddybridge.core.animais.animal.model.AnimalDto;
import br.com.buddybridge.core.animais.animal.model.GetAnimalDTO;
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
import java.util.Optional;


@RestController
@AllArgsConstructor
@RequestMapping("animal")
public class AnimalController {
    
    private AnimalService animalService;

    @GetMapping
    public ResponseEntity<List<GetAnimalDTO>> getALlAnimalModels(){
        List<GetAnimalDTO> animalModels = new ArrayList<>(this.animalService.findAll());
        if (animalModels.isEmpty()) {
            return new ResponseEntity<>(animalModels, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ArrayList<> (animalModels), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<AnimalModel> insertAnimalModel(@RequestBody AnimalDto animalDto){
        try {
            AnimalModel animal = this.animalService.saveAnimalModel(animalDto);
            return new ResponseEntity<>(animal, HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetAnimalDTO> getAnimalModelById(@PathVariable Long id) throws Exception {
        try {
            GetAnimalDTO model = this.animalService.findAnimalModelById(id);
            return new ResponseEntity<>(model, HttpStatus.OK);
        }
         catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
         }
    }

    @PutMapping
    public ResponseEntity<AnimalDto> updateAnimalModel(@RequestBody AnimalDto animalDto) throws SystemException, ExampleExeption {
        if(this.animalService.existsByIdAnimal(animalDto.getId_animal())) {
            this.animalService.saveAnimalModel(animalDto);
            return new ResponseEntity<>(animalDto, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteAnimalModel(@PathVariable Long id){
        if (this.animalService.existsByIdAnimal(id)){

            this.animalService.deleteAnimalModel(id);

            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
