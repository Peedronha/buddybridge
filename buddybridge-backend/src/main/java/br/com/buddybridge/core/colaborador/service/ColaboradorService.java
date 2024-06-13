package br.com.buddybridge.core.colaborador.service;

import br.com.buddybridge.core.colaborador.entity.Colaborador;
import br.com.buddybridge.core.colaborador.repository.ColaboradorRepository;
import br.com.buddybridge.core.security.config.PasswordGenerator;
import br.com.buddybridge.core.usuario.entity.Usuario;
import br.com.buddybridge.core.usuario.repository.UsuarioRepository;
import br.com.buddybridge.core.usuario.service.UsuarioService;
import br.com.buddybridge.core.util.ExampleExeption;
import jakarta.transaction.SystemException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static br.com.buddybridge.core.security.config.PasswordGenerator.generatePassword;

@Service
@AllArgsConstructor
public class ColaboradorService {
    private ColaboradorRepository colaboradorRepository;
    private UsuarioRepository usuarioRepository;
    private UsuarioService usuarioService;

    @Transactional(readOnly = true)
    public List<Colaborador> findAll() {
        return colaboradorRepository.findAll();
    }

    public Colaborador inativarColaborador(Colaborador colaborador) {
        System.out.println("to aqui");
        String nomeColaborador = colaborador.getNome_colaborador() + " [INATIVO]";
        colaborador.setNome_colaborador(nomeColaborador);
        colaborador.getUsuarioColaborador().setConfirmacaoEmail(true);
        return colaboradorRepository.save(colaborador);
    }

    public Colaborador saveColaborador(Colaborador colaborador) throws SystemException, ExampleExeption {
        try {
            if(colaborador.getIdcolaborador() != null){
                colaborador = colaboradorRepository.save(colaborador);
            } else {
                Usuario user = new Usuario();
                user.setNome(colaborador.getNome_colaborador());
                user.setLogin(colaborador.getEmail());
                user.setSenha(PasswordGenerator.generatePassword(8));
                Usuario persisted = usuarioService.salvar(user, true);
                colaborador.setUsuarioColaborador(persisted);
                return colaboradorRepository.save(colaborador);
            }
            return colaborador;
        } catch (Exception e) {
            throw new SystemException(String.valueOf(e));
        }
    }

    @Transactional
    public Optional<Colaborador> findColaboradorById(Long id) {
        return colaboradorRepository.findById(id);
    }

    @Transactional
    public void deleteColaborador(Long id) {
        colaboradorRepository.deleteById(id);
    }

    public boolean existsByEmail(String emailcolaborador) {
        return colaboradorRepository.existsByEmail(emailcolaborador);
    }

}
