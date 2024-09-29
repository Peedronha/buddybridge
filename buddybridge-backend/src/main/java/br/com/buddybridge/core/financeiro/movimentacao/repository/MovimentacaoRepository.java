package br.com.buddybridge.core.financeiro.movimentacao.repository;


import br.com.buddybridge.core.financeiro.movimentacao.entity.Movimentacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovimentacaoRepository extends JpaRepository<Movimentacao, Long> {
}
