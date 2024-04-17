package br.com.buddybridge.core.endereco.service;

import br.com.buddybridge.core.endereco.entity.Endereco;
import br.com.buddybridge.core.endereco.repository.EnderecoRepository;
import br.com.buddybridge.core.util.ExampleExeption;
import jakarta.annotation.Resource;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.SystemException;
import jakarta.transaction.Transactional;
import jakarta.transaction.UserTransaction;
import java.util.List;
@AllArgsConstructor
@Service
public class EnderecoService {

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Resource
    private UserTransaction utx;

    @Transactional(value = Transactional.TxType.REQUIRES_NEW)
    public void salvar(Endereco endereco) throws ExampleExeption, SystemException {
        try {
            utx.begin();
            if(endereco.getLogradouroEndereco() == null || endereco.getLogradouroEndereco().equals("")){
                throw new ExampleExeption("O logradouro é uma informação obrigatória. ", "ERRO001");
            }
            if(endereco.getNumeroEndereco() == null || endereco.getNumeroEndereco().equals("")){
                throw new ExampleExeption("O número é uma informação obrigatória. ", "ERRO001");
            }
            if(endereco.getCidadeEndereco() == null || endereco.getCidadeEndereco().equals("")){
                throw new ExampleExeption("A cidade é uma informação obrigatória. ", "ERRO001");
            }
            if(endereco.getEstadoEndereco() == null || endereco.getEstadoEndereco().equals("")){
                throw new ExampleExeption("O estado é uma informação obrigatória. ", "ERRO001");
            }
            if(endereco.getPaisEndereco() == null || endereco.getPaisEndereco().equals("")){
                throw new ExampleExeption("O pais é uma informação obrigatória. ", "ERRO001");
            }
            if(endereco.getBairroEndereco() == null || endereco.getBairroEndereco().equals("")){
                throw new ExampleExeption("O bairro é uma informação obrigatória. ", "ERRO001");
            }
          
            enderecoRepository.save(endereco);
            utx.commit();
        } catch (Exception e) {
            utx.rollback();
        }
    }

    public List<Endereco> listar() {
        List<Endereco> enderecos = enderecoRepository.findAll();
        return enderecos;
    }

    public Endereco buscarPorId(Long id) {
        return enderecoRepository.findById(id).get();
    }

    public void excluir(Long id) {
        enderecoRepository.deleteById(id);
    }


}
