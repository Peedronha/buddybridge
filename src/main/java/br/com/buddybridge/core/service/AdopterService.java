package br.com.buddybridge.core.service;

import br.com.buddybridge.core.model.AdopterModel;
import br.com.buddybridge.core.repository.AdopterRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AdopterService {
    private AdopterRepository adopterRepository;
    @Transactional(readOnly = true)
    public List<AdopterModel> findAll() {
        return adopterRepository.findAll();
    }
    @Transactional
    public void saveAdopterModel(AdopterModel adopterModel) {
         adopterRepository.save(adopterModel);
    }
    @Transactional
    public Optional<AdopterModel> findAdopterModelById(Long id) {
        return adopterRepository.findById(id);
    }
    @Transactional
    public void deleteAdopterModel(Long id) {
        adopterRepository.deleteById(id);
    }
}
