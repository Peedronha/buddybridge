package br.com.buddybridge.core.financeiro.movimentacao.service;

import br.com.buddybridge.core.financeiro.movimentacao.entity.Movimentacao;
import br.com.buddybridge.core.financeiro.movimentacao.repository.MovimentacaoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class MovimentacaoService {

    private final MovimentacaoRepository movimentacaoRepository;

    public Movimentacao saveMovimentacao(Movimentacao movimentacao) {
        return movimentacaoRepository.save(movimentacao);
    }

    public List<Movimentacao> findAll() {
        return movimentacaoRepository.findAll();
    }

    public Optional<Movimentacao> findMovimentacaoById(Long id) {
        return movimentacaoRepository.findById(id);
    }

    public void deleteMovimentacaoById(Long id) {
        movimentacaoRepository.deleteById(id);
    }
}
