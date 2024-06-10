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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    private AnimalModel createAnimal(@NotNull AnimalDto animalDto) {
        AnimalModel model = new AnimalModel(animalDto);
        if (tipoRepository.existsById(Long.valueOf(animalDto.getTipo_animal()))
                && racaRepository.existsById(Long.valueOf(animalDto.getRaca_animal()))) {
            Optional<TypeModel> typeModel = tipoRepository.findById(Long.valueOf(animalDto.getTipo_animal()));
            Optional<RacaModel> racaModel = racaRepository.findById(Long.valueOf(animalDto.getRaca_animal()));
            model.setType(typeModel.get());
            model.setRace(racaModel.get());

           return model;
        }
        return null;
    }

    @Transactional
    public Optional<AnimalModel> findAnimalModelById(Long id) {
        return animalRepository.findById(id);
    }

    @Transactional
    public void deleteAnimalModel(Long id) {
        animalRepository.deleteById(id);
    }

    public boolean existsByIdAnimal(Long id) {
        return animalRepository.existsById(id);
    }

}
