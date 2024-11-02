package br.com.buddybridge.core.financeiro.classificacao.repository;
import br.com.buddybridge.core.controleacesso.entity.GrupoAcesso;
import br.com.buddybridge.core.financeiro.classificacao.entity.Classificacao;
import br.com.buddybridge.core.financeiro.contacaixa.entity.ContaCaixa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassificacaoRepository extends JpaRepository<Classificacao, Long> {

    // Método que busca todas as classificações onde 'ativo' é true
    List<Classificacao> findByAtivoClassificacaoTrue();

    // Método para buscar classificações por tipo (Entrada ou Saída)
    List<Classificacao> findByTipo(String tipo);

}
