package br.com.buddybridge.core.voluntario.service;

import br.com.buddybridge.core.util.ExampleExeption;
import br.com.buddybridge.core.voluntario.entity.Voluntario;
import br.com.buddybridge.core.voluntario.repository.VoluntarioRepository;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.SystemException;
import jakarta.transaction.Transactional;
import jakarta.transaction.UserTransaction;
import java.util.List;

@Service
public class VoluntarioService {

    @Autowired
    private VoluntarioRepository voluntarioRepository;

    @Resource
    private UserTransaction utx;

    @Transactional(value = Transactional.TxType.REQUIRES_NEW)
    public void salvar(Voluntario voluntario) throws ExampleExeption, SystemException {
        try {
            utx.begin();
            if(voluntario.getPfPjVoluntario() == null || voluntario.getPfPjVoluntario().equals("")){
                throw new ExampleExeption("O tipo do voluntario é uma informação obrigatória. ", "ERRO001");
            }
            if(voluntario.getPfPjVoluntario() != null){
                if(voluntario.getPfPjVoluntario().equalsIgnoreCase("pessoa física")) {
                    if (voluntario.getCpfVoluntario() == null || voluntario.getCpfVoluntario().equals("")) {
                        throw new ExampleExeption("O CPF é uma informação obrigatória. ", "ERRO001");
                    }
                } else {
                    if (voluntario.getCnpjVoluntario() == null || voluntario.getCnpjVoluntario().equals("")) {
                        throw new ExampleExeption("O CNPJ é uma informação obrigatória. ", "ERRO001");
                    }
                }
            }
            if(voluntario.getCargoVoluntario() == null || voluntario.getCargoVoluntario().equals("")){
                throw new ExampleExeption("O CNPJ é uma informação obrigatória. ", "ERRO001");
            }
          
            voluntarioRepository.save(voluntario);
            utx.commit();
        } catch (Exception e) {
            utx.rollback();
        }
    }

    public List<Voluntario> listar() {
        List<Voluntario> voluntarios = voluntarioRepository.findAll();
        return voluntarios;
    }

    public Voluntario buscarPorId(Long id) {
        return voluntarioRepository.findById(id).get();
    }

    public void excluir(Long id) {
        voluntarioRepository.deleteById(id);
    }


}
