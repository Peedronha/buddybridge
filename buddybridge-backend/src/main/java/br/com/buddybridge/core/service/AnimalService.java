package br.com.buddybridge.core.service;

import br.com.buddybridge.core.model.AnimalModel;
import br.com.buddybridge.core.repository.AnimalRepository;
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
    @Transactional
    public void saveAnimalModel(AnimalModel animalModel) {
        animalRepository.save(animalModel);
    }
    @Transactional
    public Optional<AnimalModel> findAnimalModelById(Long id) {
        return animalRepository.findById(id);
    }
    @Transactional
    public void deleteAnimalModel(Long id) {
        animalRepository.deleteById(id);
    }
}
