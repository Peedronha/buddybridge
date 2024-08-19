package br.com.buddybridge.core.adocao.service;

import br.com.buddybridge.core.adocao.entity.AdoptionDTO;
import br.com.buddybridge.core.adocao.entity.GetAdoptionProfileDTO;
import br.com.buddybridge.core.adocao.model.AdoptionProfileModel;
import br.com.buddybridge.core.adocao.repository.AdoptionRepository;
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
    public GetAdoptionProfileDTO findAdoptionProfileModelById(Long id) throws Exception {
        Optional<AdoptionProfileModel> profileModel = this.adoptionRepository.findById(id);
        return profileModel.map(GetAdoptionProfileDTO::new)
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

    public List<GetAdoptionProfileDTO> findAll() {
        List<GetAdoptionProfileDTO> dtos = new ArrayList<>();
        for (AdoptionProfileModel model: adoptionRepository.findAll())
        {
            dtos.add(new GetAdoptionProfileDTO(model));
        };
        return dtos;
    }
}
