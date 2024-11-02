package br.com.buddybridge.core.financeiro.classificacao.service;

import br.com.buddybridge.core.financeiro.classificacao.entity.Classificacao;
import br.com.buddybridge.core.financeiro.classificacao.repository.ClassificacaoRepository;
import br.com.buddybridge.core.financeiro.contacaixa.entity.ContaCaixa;
import br.com.buddybridge.core.util.ExampleExeption;
import jakarta.transaction.SystemException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ClassificacaoService {

    private ClassificacaoRepository classificacaoRepository;

    public Classificacao saveClassificacao(Classificacao classificacao) throws SystemException, ExampleExeption {
        try {
            return classificacaoRepository.save(classificacao);
        } catch (Exception e) {
            throw new SystemException(String.valueOf(e));
        }
    }

    public void deleteClassificacaoById(Long id) {
        this.classificacaoRepository.deleteById(id);
    }

    public List<Classificacao> findAll() {
        return classificacaoRepository.findAll();
    }

    public List<Classificacao> findByAtivoClassificacaoTrue() {
        return classificacaoRepository.findByAtivoClassificacaoTrue();
    }
    
    public Optional<Classificacao> findClassificacaoById(Long id) {
       return this.classificacaoRepository.findById(id);
    }

    public List<Classificacao> findByTipo(String tipo) {
        return this.classificacaoRepository.findByTipo(tipo);
    }

}
