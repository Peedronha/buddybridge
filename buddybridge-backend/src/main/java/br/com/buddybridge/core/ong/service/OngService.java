package br.com.buddybridge.core.ong.service;

import br.com.buddybridge.core.ong.entity.Ong;
import br.com.buddybridge.core.ong.repository.OngRepository;
import br.com.buddybridge.core.util.ExampleExeption;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.SystemException;
import jakarta.transaction.Transactional;
import jakarta.transaction.UserTransaction;
import java.util.List;

@Service
public class OngService {

    @Autowired
    private OngRepository ongRepository;

    @Resource
    private UserTransaction utx;

    @Transactional(value = Transactional.TxType.REQUIRES_NEW)
    public void salvar(Ong ong) throws ExampleExeption, SystemException {
        try {
            utx.begin();
            if(ong.getRazaoSocialOng() == null || ong.getRazaoSocialOng().equals("")){
                throw new ExampleExeption("A razão social é uma informação obrigatória. ", "ERRO001");
            }
            if(ong.getCnpjOng() == null || ong.getCnpjOng().equals("")){
                throw new ExampleExeption("O CNPJ é uma informação obrigatória. ", "ERRO001");
            }
            if(ong.getTelefoneOng() == null || ong.getTelefoneOng().equals("")){
                throw new ExampleExeption("O telefone é uma informação obrigatória. ", "ERRO001");
            }
            if(ong.getEmailContatoOng() == null || ong.getEmailContatoOng().equals("")){
                throw new ExampleExeption("O email é uma informação obrigatória. ", "ERRO001");
            }
            if(ong.getEmailFinanceiroOng() == null || ong.getEmailFinanceiroOng().equals("")){
                throw new ExampleExeption("O email financeiro é uma informação obrigatória. ", "ERRO001");
            }
            ongRepository.save(ong);
            utx.commit();
        } catch (Exception e) {
            utx.rollback();
        }
    }

    public List<Ong> listar() {
        List<Ong> ongs = ongRepository.findAll();
        return ongs;
    }

    public Ong buscarPorId(Long id) {
        return ongRepository.findById(id).get();
    }

    public void excluir(Long id) {
        ongRepository.deleteById(id);
    }


}
