package br.com.buddybridge.core.animais.animal.service;

import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import br.com.buddybridge.core.animais.animal.model.AnimalDto;
import br.com.buddybridge.core.animais.animal.model.GetAnimalDTO;
import br.com.buddybridge.core.animais.animal.repository.AnimalRepository;
import br.com.buddybridge.core.animais.raca.entity.RacaModel;
import br.com.buddybridge.core.animais.raca.repository.RacaRepository;
import br.com.buddybridge.core.animais.tipo.entity.TypeModel;
import br.com.buddybridge.core.animais.tipo.repository.TypeRepository;
import br.com.buddybridge.core.util.ExampleExeption;
import jakarta.transaction.SystemException;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AnimalService {

    private AnimalRepository animalRepository;
    private TypeRepository tipoRepository;
    private RacaRepository racaRepository;

    @Transactional(readOnly = true)
    public List<GetAnimalDTO> findAll() {
        List<GetAnimalDTO> dtos = new ArrayList<>();
        for (AnimalModel model: animalRepository.findAll())
        {
            dtos.add(new GetAnimalDTO(model));
        };
        return dtos;
    }


    public AnimalModel saveAnimalModel(AnimalDto animalDto) throws SystemException, ExampleExeption {
        try {
            return animalRepository.save(createAnimal(animalDto));
        } catch (Exception e) {
            throw new SystemException(String.valueOf(e));
        }
    }

    private AnimalModel createAnimal(AnimalDto animalDto) throws Exception{
        AnimalModel model = new AnimalModel(animalDto);

        Optional<TypeModel> typeModel = tipoRepository.findById(Long.valueOf(animalDto.getTipo_animal()));
        Optional<RacaModel> racaModel = racaRepository.findById(Long.valueOf(animalDto.getRaca_animal()));

        if (typeModel.isPresent() && racaModel.isPresent()) {
            model.setType(typeModel.get());
            model.setRace(racaModel.get());

            return model;
        } else {
            throw new Exception("Tipo or Raca not found");
        }
    }

    @Transactional
    public GetAnimalDTO findAnimalModelById(Long id) throws Exception {
        Optional<AnimalModel> animalModel = this.animalRepository.findById(id);
        return animalModel.map(GetAnimalDTO::new)
                .orElseThrow(Exception::new);
    }

    @Transactional
    public void deleteAnimalModel(Long id) {
        animalRepository.deleteById(id);
    }

    public boolean existsByIdAnimal(Long id) {
        return animalRepository.existsById(id);
    }

}
