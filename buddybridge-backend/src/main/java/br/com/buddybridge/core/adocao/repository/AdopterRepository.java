package br.com.buddybridge.core.adocao.repository;

import br.com.buddybridge.core.adocao.entity.AdopterModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdopterRepository extends JpaRepository<AdopterModel, Long> {
}
