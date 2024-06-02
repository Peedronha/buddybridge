package br.com.buddybridge.core.animais.raca.controller;

import br.com.buddybridge.core.animais.raca.entity.RacaModel;
import br.com.buddybridge.core.animais.raca.model.RaceDTO;
import br.com.buddybridge.core.animais.raca.service.RacaService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("raca")
public class RacaController {

    private RacaService service;

    @GetMapping("/{id}")
    public ResponseEntity<List<RacaModel>> getAllByType(@PathVariable String type) {
        List<RacaModel> models = new ArrayList<>(this.service.findAllByType(type));
        if (models.isEmpty()) {
            return new ResponseEntity<>(models, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ArrayList<>(models), HttpStatus.OK);
    }

    @PostMapping
    public void CreateRace(@RequestBody RaceDTO raceDTO) {
        this.service.createNewRace(raceDTO);
    }

    @DeleteMapping
    public ResponseEntity<Boolean> DeleteRace(@PathVariable Long id){
        if (this.service.findRaceModelById(id).isPresent()){

            this.service.deleteRaceById(id);

            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}