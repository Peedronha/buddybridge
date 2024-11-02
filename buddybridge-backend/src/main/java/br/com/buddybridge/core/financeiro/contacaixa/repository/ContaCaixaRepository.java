package br.com.buddybridge.core.financeiro.contacaixa.repository;

import br.com.buddybridge.core.financeiro.contacaixa.entity.ContaCaixa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContaCaixaRepository extends JpaRepository<ContaCaixa, Long> {

    List<ContaCaixa> findByAtivoContaCaixaTrue();

    List<ContaCaixa> findByTipoContaCaixa(String tipoContaCaixa);

}
