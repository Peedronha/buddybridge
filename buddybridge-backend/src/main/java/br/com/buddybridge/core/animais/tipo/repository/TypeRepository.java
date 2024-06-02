package br.com.buddybridge.core.animais.tipo.repository;

import br.com.buddybridge.core.animais.tipo.entity.TypeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeRepository extends JpaRepository<TypeModel, Long> {
}
