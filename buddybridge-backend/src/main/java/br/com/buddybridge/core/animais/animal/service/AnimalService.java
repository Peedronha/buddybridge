package br.com.buddybridge.core.animais.animal.service;

import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import br.com.buddybridge.core.animais.animal.repository.AnimalRepository;
import br.com.buddybridge.core.util.ExampleExeption;
import jakarta.transaction.SystemException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AnimalService {

    private AnimalRepository animalRepository;

    @Transactional(readOnly = true)
    public List<AnimalModel> findAll() {
        return animalRepository.findAll();
    }


    public AnimalModel saveAnimalModel(AnimalModel animalModel) throws SystemException, ExampleExeption {
        try {
            return animalRepository.save(animalModel);
        } catch (Exception e) {
            throw new SystemException(String.valueOf(e));
        }
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
