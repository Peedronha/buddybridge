package br.com.buddybridge.core.animais.tipo.controller;

import br.com.buddybridge.core.animais.tipo.entity.TypeModel;
import br.com.buddybridge.core.animais.tipo.model.TypeDTO;
import br.com.buddybridge.core.animais.tipo.service.TypeService;
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
@RequestMapping("tipo")
public class TypeController {

    private TypeService service;

    @GetMapping
    public ResponseEntity<List<TypeModel>> getALlTypeModels(){
        List<TypeModel> typeModels = new ArrayList<>(this.service.findAll());
        if (typeModels.isEmpty()) {
            return new ResponseEntity<>(typeModels, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ArrayList<> (typeModels), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<TypeModel> insertTypeModel(@RequestBody TypeDTO typeDTO){
        try {
            TypeModel typeModel = this.service.saveTypeModel(generateType(typeDTO));
            return new ResponseEntity<>(typeModel, HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<TypeModel> getTypeModelById(@PathVariable Long id){
        Optional<TypeModel> typeModel = this.service.findTypeModelById(id);
        return typeModel.map(model -> new ResponseEntity<>(model, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(null,HttpStatus.NOT_FOUND));
    }

    @PutMapping
    public ResponseEntity<TypeModel> updateTypeModel(@RequestBody TypeModel typeModel) throws SystemException, ExampleExeption {
        if(this.service.findTypeModelById(typeModel.getId()).isPresent()) {
            this.service.saveTypeModel(typeModel);
            return new ResponseEntity<>(typeModel, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteTypeModel(@PathVariable Long id){
        if (this.service.findTypeModelById(id).isPresent()){

            this.service.deleteTypeModel(id);

            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private TypeModel generateType(TypeDTO typeDTO) {
        TypeModel typeModel = new TypeModel();
        typeModel.setRaces(new ArrayList<>());
        typeModel.setName(typeDTO.getName());

        return typeModel;
    }
}
