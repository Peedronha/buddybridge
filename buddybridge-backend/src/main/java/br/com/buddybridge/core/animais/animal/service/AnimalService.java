package br.com.buddybridge.core.animais.animal.service;

import br.com.buddybridge.core.adocao.entity.AdoptionStatus;
import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import br.com.buddybridge.core.animais.animal.model.AnimalAdoptionStatusDTO;
import br.com.buddybridge.core.animais.animal.model.AnimalDto;
import br.com.buddybridge.core.animais.animal.model.AnimalRescueAdoptionDTO;
import br.com.buddybridge.core.animais.animal.model.GetAnimalDTO;
import br.com.buddybridge.core.animais.animal.repository.AnimalRepository;
import br.com.buddybridge.core.animais.raca.entity.RacaModel;
import br.com.buddybridge.core.animais.raca.repository.RacaRepository;
import br.com.buddybridge.core.animais.tipo.entity.TypeModel;
import br.com.buddybridge.core.animais.tipo.repository.TypeRepository;
import br.com.buddybridge.core.util.ExampleExeption;
import jakarta.transaction.SystemException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

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


        Optional<RacaModel> racaModel = racaRepository.findById(Long.valueOf(animalDto.getRaca_animal()));

        if (racaModel.isPresent()) {

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

    public AnimalAdoptionStatusDTO getAnimalAdoptionStatus() {
        long completedAdoptions = animalRepository.countAnimalsWithCompletedAdoption();
        long inProgressAdoptions = animalRepository.countAnimalsWithAdoptionInProgress();
        long pendingAdoptions = animalRepository.countAnimalsAwaitingAdoption();
        long noAdoptionProfile = animalRepository.countAnimalsWithoutAdoptionProfile();

        return new AnimalAdoptionStatusDTO(completedAdoptions, inProgressAdoptions, pendingAdoptions, noAdoptionProfile);
    }

    public List<GetAnimalDTO> findAnimalsAwaitingAnalysis() {
        List<AnimalModel> animalModels = animalRepository.findAnimalsAwaitingAnalysis();
        List<GetAnimalDTO> animalDtos = new ArrayList<>();
        for (AnimalModel animal : animalModels) {
            animalDtos.add(new GetAnimalDTO(animal));
        }
        return animalDtos;
    }

    public List<AnimalRescueAdoptionDTO> getAnimalsRescuedAndAdoptedByYear(int year) {
        List<Object[]> rescuedAnimals = animalRepository.countRescuedAnimalsByMonthAndYear(year);

        System.out.println("rescuedAnimals"+rescuedAnimals);

        List<Object[]> adoptedAnimals = animalRepository.countAdoptedAnimalsByMonthAndYear(year);

        System.out.println("adoptedAnimals"+adoptedAnimals);

        // Mapa para armazenar os dados, com o mês como chave
        Map<Integer, AnimalRescueAdoptionDTO> dataMap = new HashMap<>();

        // Inicializando os 12 meses com valores 0 para resgates e adoções
        for (int i = 1; i <= 12; i++) {
            dataMap.put(i, new AnimalRescueAdoptionDTO(i, 0L, 0L));
        }

        // Populando os dados de resgatados
        for (Object[] result : rescuedAnimals) {
            Integer month = (Integer) result[0];
            Long totalResgatados = (Long) result[1];
            dataMap.get(month).setTotalResgatados(totalResgatados);
        }

        // Populando os dados de adotados
        for (Object[] result : adoptedAnimals) {
            Integer month = (Integer) result[0];
            Long totalAdotados = (Long) result[1];
            dataMap.get(month).setTotalAdotados(totalAdotados);
        }

        // Convertendo o mapa para uma lista e retornando os dados
        return new ArrayList<>(dataMap.values());
    }

    // Obter contagem de animais por status de adoção
    public Map<String, Long> getAnimalsByAdoptionStatus() {
        List<Object[]> results = animalRepository.countAnimalsByAdoptionStatus();
        Map<String, Long> statusCount = new HashMap<>();
        for (Object[] result : results) {
            statusCount.put((String) result[0], (Long) result[1]);
        }
        return statusCount;
    }

    // Obter contagem de animais por raça
    public Map<String, Long> getAnimalsByRace() {
        List<Object[]> results = animalRepository.countAnimalsByRace();
        Map<String, Long> raceCount = new HashMap<>();
        for (Object[] result : results) {
            raceCount.put((String) result[0], (Long) result[1]);
        }
        return raceCount;
    }


}
