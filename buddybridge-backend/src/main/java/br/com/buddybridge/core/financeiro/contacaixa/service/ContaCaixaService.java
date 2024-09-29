package br.com.buddybridge.core.financeiro.contacaixa.service;

import br.com.buddybridge.core.financeiro.contacaixa.entity.ContaCaixa;
import br.com.buddybridge.core.financeiro.contacaixa.repository.ContaCaixaRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ContaCaixaService {

    private final ContaCaixaRepository contaCaixaRepository;

    public ContaCaixa saveContaCaixa(ContaCaixa contaCaixa) {
        return contaCaixaRepository.save(contaCaixa);
    }

    public List<ContaCaixa> findAll() {
        return contaCaixaRepository.findAll();
    }

    public Optional<ContaCaixa> findContaCaixaById(Long id) {
        return contaCaixaRepository.findById(id);
    }

    public List<ContaCaixa> findByAtivoContaCaixaTrue() {
        return contaCaixaRepository.findByAtivoContaCaixaTrue();
    }

    public List<ContaCaixa> findByTipoContaCaixa(String tipoContaCaixa) {
        return contaCaixaRepository.findByTipoContaCaixa(tipoContaCaixa);
    }

    public void deleteContaCaixaById(Long id) {
        contaCaixaRepository.deleteById(id);
    }

}
