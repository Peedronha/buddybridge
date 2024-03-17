package br.com.buddybridge.core.controller;

import br.com.buddybridge.core.model.OngModel;
import br.com.buddybridge.core.service.OngService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("employee")
public class OngController {
    
    private OngService ongService;

    @GetMapping
    public ResponseEntity<List<OngModel>> getALlOngModels(){
        List<OngModel> ongModels = new ArrayList<>(this.ongService.findAll());
        if (ongModels.isEmpty()) {
            return new ResponseEntity<>(ongModels, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ArrayList<> (ongModels), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<OngModel> insertOngModel(@RequestBody OngModel ongModel){
        try{
            this.ongService.saveOngModel(ongModel);
            return new ResponseEntity<>(ongModel, HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<OngModel> getOngModelById(@PathVariable Long id){
        Optional<OngModel> OngModel = this.ongService.findOngModelById(id);
        return OngModel.map(model -> new ResponseEntity<>(model, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(null,HttpStatus.NOT_FOUND));
    }

    @PutMapping
    public ResponseEntity<OngModel> updateOngModel(@RequestAttribute Long id,@RequestBody OngModel ongModel){
        if(this.ongService.findOngModelById(id).isPresent()) {
            this.ongService.saveOngModel(ongModel);
            return new ResponseEntity<>(ongModel, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteOngModel(@PathVariable Long id){
        if (this.ongService.findOngModelById(id).isPresent()){
            this.ongService.deleteOngModel(id);
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
