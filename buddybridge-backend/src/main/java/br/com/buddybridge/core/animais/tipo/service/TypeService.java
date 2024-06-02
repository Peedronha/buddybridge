package br.com.buddybridge.core.animais.tipo.service;

import br.com.buddybridge.core.animais.tipo.entity.TypeModel;
import br.com.buddybridge.core.animais.tipo.repository.TypeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TypeService {

    private TypeRepository typeRepository;

    public List<TypeModel> findAll() {
        return this.typeRepository.findAll();
    }

    public TypeModel saveTypeModel(TypeModel typeModel) {
        return this.typeRepository.save(typeModel);
    }

    public Optional<TypeModel> findTypeModelById(Long id) {
        return this.typeRepository.findById(id);
    }

    public void deleteTypeModel(Long id) {
        this.typeRepository.deleteById(id);
    }
}

