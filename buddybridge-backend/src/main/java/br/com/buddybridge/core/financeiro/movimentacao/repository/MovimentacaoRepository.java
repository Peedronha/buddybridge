package br.com.buddybridge.core.financeiro.movimentacao.repository;


import br.com.buddybridge.core.financeiro.movimentacao.entity.Movimentacao;
import br.com.buddybridge.core.financeiro.movimentacao.model.ResumoMovimentacaoDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface MovimentacaoRepository extends JpaRepository<Movimentacao, Long> {

    @Query("SELECT SUM(m.valor) FROM Movimentacao m WHERE m.classificacao.tipo = 'Saída' AND FUNCTION('MONTH', m.dataLancamento) = :mesAtual AND FUNCTION('YEAR', m.dataLancamento) = :anoAtual")
    BigDecimal totalDespesasProgramadas(@Param("mesAtual") int mesAtual, @Param("anoAtual") int anoAtual);

    @Query("SELECT SUM(m.valor) FROM Movimentacao m WHERE m.classificacao.tipo = 'Entrada' AND FUNCTION('MONTH', m.dataLancamento) = :mesAtual AND FUNCTION('YEAR', m.dataLancamento) = :anoAtual")
    BigDecimal totalReceitasProgramadas(@Param("mesAtual") int mesAtual, @Param("anoAtual") int anoAtual);

    @Query("SELECT SUM(p.valorPagamento) FROM Pagamento p WHERE p.movimentacao.classificacao.tipo = 'Saída' AND FUNCTION('MONTH', p.dataRecebimento) = :mesAtual AND FUNCTION('YEAR', p.dataRecebimento) = :anoAtual")
    BigDecimal totalDespesasPagas(@Param("mesAtual") int mesAtual, @Param("anoAtual") int anoAtual);

    @Query("SELECT SUM(p.valorPagamento) FROM Pagamento p WHERE p.movimentacao.classificacao.tipo = 'Entrada' AND FUNCTION('MONTH', p.dataRecebimento) = :mesAtual AND FUNCTION('YEAR', p.dataRecebimento) = :anoAtual")
    BigDecimal totalReceitasRecebidas(@Param("mesAtual") int mesAtual, @Param("anoAtual") int anoAtual);

    @Query("SELECT m.historico, m.dataLancamento, m.valor - COALESCE(SUM(p.valorPagamento), 0), " +
            "m.classificacao.tipo, m.idMovimentacao, " +
            "(CASE WHEN m.dataLancamento < CURRENT_DATE THEN true ELSE false END) " +
            "FROM Movimentacao m " +
            "LEFT JOIN Pagamento p ON m.idMovimentacao = p.movimentacao.idMovimentacao " +
            "WHERE m.dataLancamento <= CURRENT_DATE + 30 " +
            "AND m.valor > COALESCE((SELECT SUM(pag.valorPagamento) FROM Pagamento pag WHERE pag.movimentacao.idMovimentacao = m.idMovimentacao), 0) " +
            "GROUP BY m.historico, m.dataLancamento, m.valor, m.classificacao.tipo, m.idMovimentacao " +
            "ORDER BY CASE WHEN m.dataLancamento < CURRENT_DATE THEN 1 ELSE 0 END DESC")
    List<Object[]> findMovimentacoesPendentes();

    @Query("SELECT MONTH(m.dataLancamento), " +
            "SUM(CASE WHEN c.tipo = 'Entrada' THEN m.valor ELSE 0 END), " +
            "SUM(CASE WHEN c.tipo = 'Saída' THEN m.valor ELSE 0 END) " +
            "FROM Movimentacao m " +
            "JOIN m.classificacao c " +
            "WHERE YEAR(m.dataLancamento) = :ano " +
            "GROUP BY MONTH(m.dataLancamento) " +
            "ORDER BY MONTH(m.dataLancamento)")
    List<Object[]> findReceitaDespesaAnual(@Param("ano") int ano);

    // Consulta para receitas por conta de caixa (tipo = 'Entrada')
    @Query("SELECT p.contaCaixa.descricaoContaCaixa, SUM(m.valor) " +
            "FROM Pagamento p " +
            "JOIN p.movimentacao m " +
            "JOIN m.classificacao c " +
            "WHERE c.tipo = 'ENTRADA' AND " +
            "((YEAR(m.dataLancamento) = :ano AND :filtro = 'ano') OR " +
            "(YEAR(m.dataLancamento) = :ano AND MONTH(m.dataLancamento) = :mes AND :filtro = 'mes') OR " +
            "(:filtro = 'todos')) " +
            "GROUP BY p.contaCaixa.descricaoContaCaixa")
    List<Object[]> findReceitasPorContaCaixa(@Param("ano") int ano, @Param("mes") int mes, @Param("filtro") String filtro);

    // Consulta para despesas por conta de caixa (tipo = 'Saída')
    @Query("SELECT p.contaCaixa.descricaoContaCaixa, SUM(m.valor) " +
            "FROM Pagamento p " +
            "JOIN p.movimentacao m " +
            "JOIN m.classificacao c " +
            "WHERE c.tipo = 'SAIDA' AND " +
            "((YEAR(m.dataLancamento) = :ano AND :filtro = 'ano') OR " +
            "(YEAR(m.dataLancamento) = :ano AND MONTH(m.dataLancamento) = :mes AND :filtro = 'mes') OR " +
            "(:filtro = 'todos')) " +
            "GROUP BY p.contaCaixa.descricaoContaCaixa")
    List<Object[]> findDespesasPorContaCaixa(@Param("ano") int ano, @Param("mes") int mes, @Param("filtro") String filtro);

    @Query("SELECT m FROM Movimentacao m " +
            "LEFT JOIN Pagamento p ON m.idMovimentacao = p.movimentacao.idMovimentacao " +
            "GROUP BY m.idMovimentacao " +
            "HAVING m.valor > COALESCE(SUM(p.valorPagamento), 0)")
    List<Movimentacao> findMovimentacoesPendentesToRecieve();

}
