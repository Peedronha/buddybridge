package br.com.buddybridge.core.adocao.service;

import br.com.buddybridge.core.adocao.entity.AdoptionDTO;
import br.com.buddybridge.core.adocao.entity.GetAdoptionDTO;
import br.com.buddybridge.core.adocao.model.AdoptionProfileModel;
import br.com.buddybridge.core.adocao.repository.AdoptionRepository;
import br.com.buddybridge.core.animais.animal.model.GetAnimalDTO;
import jakarta.transaction.SystemException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AdoptionService {
    private AdoptionRepository adoptionRepository;
    public GetAdoptionDTO findAdoptionProfileModelById(Long id) throws Exception {
        Optional<AdoptionProfileModel> profileModel = this.adoptionRepository.findById(id);
        return profileModel.map(GetAdoptionDTO::new)
                .orElseThrow(Exception::new);
    }

    public AdoptionProfileModel saveAdoptionRequest(AdoptionDTO adoptionDTO) throws SystemException {
        try {
            return adoptionRepository.save(new AdoptionProfileModel(adoptionDTO));
        } catch (Exception e) {
            throw new SystemException(String.valueOf(e));
        }
    }

    public void deleteAdoption(Long id) {
        adoptionRepository.deleteById(id);
    }

    public boolean existsByIdAdocao(Long id) {
        return adoptionRepository.existsById(id);
    }

    public List<GetAdoptionDTO> findAll() {
        List<GetAdoptionDTO> dtos = new ArrayList<>();
        for (AdoptionProfileModel model: adoptionRepository.findAll())
        {
            dtos.add(new GetAdoptionDTO(model));
        };
        return dtos;
    }
}
