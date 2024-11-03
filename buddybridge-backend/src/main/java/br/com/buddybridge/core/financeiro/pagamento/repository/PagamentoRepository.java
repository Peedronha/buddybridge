package br.com.buddybridge.core.financeiro.pagamento.repository;

import br.com.buddybridge.core.financeiro.pagamento.entity.Pagamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {

    // Consulta personalizada para obter todos os pagamentos por movimentacaoId
    List<Pagamento> findByMovimentacao_IdMovimentacao(Long movimentacaoId);

}
