package br.com.buddybridge.core.financeiro.pagamento.repository;

import br.com.buddybridge.core.financeiro.pagamento.entity.Pagamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {
}
