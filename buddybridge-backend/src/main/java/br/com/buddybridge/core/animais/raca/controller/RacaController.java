package br.com.buddybridge.core.animais.raca.controller;

import br.com.buddybridge.core.animais.animal.model.GetAnimalDTO;
import br.com.buddybridge.core.animais.raca.entity.RacaModel;
import br.com.buddybridge.core.animais.raca.model.RaceDTO;
import br.com.buddybridge.core.animais.raca.service.RacaService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("raca")
public class RacaController {

    private RacaService racaService;

    @GetMapping
    public ResponseEntity<List<RacaModel>> getAll() {
        List<RacaModel> models = new ArrayList<>(this.racaService.findAll());
        if (models.isEmpty()) {
            return new ResponseEntity<>(models, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ArrayList<>(models), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RaceDTO> getRaceById(@PathVariable Long id) {
        Optional<RacaModel> racaModel = this.racaService.findRaceModelById(id);
        return racaModel.map(model -> new ResponseEntity<>(new RaceDTO(racaModel.get()), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }


    @GetMapping("/type/{type}")
    public ResponseEntity<List<RacaModel>> getAllByType(@PathVariable String type) {
        List<RacaModel> models = new ArrayList<>(this.racaService.findAllByType(type));
        if (models.isEmpty()) {
            return new ResponseEntity<>(models, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ArrayList<>(models), HttpStatus.OK);
    }

    @PostMapping
    public void CreateRace(@RequestBody RaceDTO raceDTO) {
        this.racaService.createNewRace(raceDTO);
    }

    @PutMapping
    public void UpdateRace(@RequestBody RaceDTO raceDTO) {
        this.racaService.createNewRace(raceDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> DeleteRace(@PathVariable Long id) {
        if (this.racaService.findRaceModelById(id).isPresent()) {

            this.racaService.deleteRaceById(id);

            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
