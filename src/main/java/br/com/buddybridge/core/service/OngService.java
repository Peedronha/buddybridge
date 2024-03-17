package br.com.buddybridge.core.service;

import br.com.buddybridge.core.model.OngModel;
import br.com.buddybridge.core.repository.OngRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class OngService {
    private OngRepository ongRepository;

    @Transactional(readOnly = true)
    public List<OngModel> findAll() {
        return ongRepository.findAll();
    }
    @Transactional
    public void saveOngModel(OngModel ongModel) {
        ongRepository.save(ongModel);
    }
    @Transactional
    public Optional<OngModel> findOngModelById(Long id) {
        return ongRepository.findById(id);
    }
    @Transactional
    public void deleteOngModel(Long id) {
        ongRepository.deleteById(id);
    }
}
