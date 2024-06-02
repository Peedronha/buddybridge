package br.com.buddybridge.core.animais.raca.service;

import br.com.buddybridge.core.animais.raca.entity.RacaModel;
import br.com.buddybridge.core.animais.raca.model.RaceDTO;
import br.com.buddybridge.core.animais.raca.repository.RacaRepository;
import br.com.buddybridge.core.animais.tipo.entity.TypeModel;
import br.com.buddybridge.core.animais.tipo.repository.TypeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RacaService {

    private RacaRepository racaRepository;
    private TypeRepository tipoRepository;

    public List<RacaModel> findAll() {
        return racaRepository.findAll();
    }

    public List<RacaModel> findAllByType(String type) {
        return racaRepository.findByTypeName(type);
    }

    public void createNewRace(RaceDTO raceDTO) {
        RacaModel model = new RacaModel();
        if (tipoRepository.findById(raceDTO.getTypeID()).isPresent()) {
            Optional<TypeModel> typeModel = tipoRepository.findById(raceDTO.getTypeID());
            model.setType(typeModel.get());
            model.setName(raceDTO.getName());

            racaRepository.save(model);
        }
    }

    public Optional<RacaModel> findRaceModelById(Long id) {
       return this.racaRepository.findById(id);
    }

    public void deleteRaceById(Long id) {
        this.racaRepository.deleteById(id);
    }
}
