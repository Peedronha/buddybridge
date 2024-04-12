package br.com.buddybridge.core.usuario.service;


import br.com.buddybridge.core.security.jwt.JwtService;
import br.com.buddybridge.core.security.config.SecurityConfig;
import br.com.buddybridge.core.usuario.entity.Usuario;
import br.com.buddybridge.core.usuario.repository.UsuarioRepository;
import br.com.buddybridge.core.util.ExampleExeption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.annotation.Resource;
import jakarta.transaction.SystemException;
import jakarta.transaction.Transactional;
import jakarta.transaction.UserTransaction;
import java.util.List;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Resource
    private UserTransaction utx;

    @Transactional(value = Transactional.TxType.REQUIRES_NEW)
    public void salvar(Usuario usuario) throws ExampleExeption, SystemException {
        try {
            utx.begin();
            if(usuario.getNome() == null && usuario.getNome().equals("")){
                throw new ExampleExeption("O nome é uma informação obrigatória. ", "ERRO001");
            }
            String senhaHash = this.bCryptPasswordEncoder().encode(usuario.getSenha());
            usuario.setSenha(senhaHash);
            System.out.println(senhaHash);
            usuarioRepository.save(usuario);
            utx.commit();
        } catch (Exception e) {
            //return e.getMessage()
            utx.rollback();
        }
    }

    public List<Usuario> listar() {
        List<Usuario> users = usuarioRepository.findAll();
        System.out.println(users.size());
        return users;
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id).get();
    }

    public void excluir(Long id) {
        usuarioRepository.deleteById(id);
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }


}
