package br.com.buddybridge.core.financeiro.pagamento.service;

import br.com.buddybridge.core.financeiro.movimentacao.entity.Movimentacao;
import br.com.buddybridge.core.financeiro.movimentacao.service.MovimentacaoService;
import br.com.buddybridge.core.financeiro.pagamento.entity.Pagamento;
import br.com.buddybridge.core.financeiro.pagamento.repository.PagamentoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PagamentoService {

    private final PagamentoRepository pagamentoRepository;
    private final MovimentacaoService movimentacaoService;

    public Pagamento savePagamento(Pagamento pagamento) throws Exception {
        Movimentacao movimentacao = pagamento.getMovimentacao();

        // Calcula o valor já pago
        BigDecimal totalPago = calcularTotalPago(movimentacao.getIdMovimentacao());

        // Valor pendente
        BigDecimal valorPendente = movimentacao.getValor().subtract(totalPago);

        // Verifica se o valor do novo pagamento não excede o valor pendente
        if (pagamento.getValorPagamento().compareTo(valorPendente) > 0) {
            throw new Exception("O valor do pagamento excede o valor pendente.");
        }

        // Atualiza o valor pendente na movimentação
        movimentacao.setValorPendente(valorPendente.subtract(pagamento.getValorPagamento()));
        movimentacaoService.saveMovimentacao(movimentacao);

        return pagamentoRepository.save(pagamento);
    }

    public List<Pagamento> findAll() {
        return pagamentoRepository.findAll();
    }

    public Optional<Pagamento> findPagamentoById(Long id) {
        return pagamentoRepository.findById(id);
    }

    public void deletePagamentoById(Long id) {
        pagamentoRepository.deleteById(id);
    }

    // Método para calcular o total pago para uma movimentação
    public BigDecimal calcularTotalPago(Long movimentacaoId) {
        List<Pagamento> pagamentos = pagamentoRepository.findAll();
        return pagamentos.stream()
                .filter(p -> p.getMovimentacao().getIdMovimentacao().equals(movimentacaoId))
                .map(Pagamento::getValorPagamento)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
