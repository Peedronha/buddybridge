package br.com.buddybridge.core.usuario.service;

import br.com.buddybridge.core.usuario.entity.Usuario;
import br.com.buddybridge.core.usuario.repository.UsuarioRepository;
import br.com.buddybridge.core.util.ExampleExeption;
import javax.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.SystemException;
import javax.transaction.Transactional;
import javax.transaction.UserTransaction;
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
            System.out.println("entrei?");
            //utx.begin();
            if(usuario.getNomeUsuario() == null && usuario.getNomeUsuario().equals("")){
                System.out.println("erro");
                throw new ExampleExeption("O nome é uma informação obrigatória. ", "ERRO001");
            }
            usuario.setAdminUsuario(false);
            usuario.setConfirmacaoEmailUsuario(true);
            usuario.setTokenUsuario("123456");
            usuario.setOngUsuario(false);
            String senhaHash = this.bCryptPasswordEncoder().encode(usuario.getSenhaUsuario());
            usuario.setSenhaUsuario(senhaHash);
            System.out.println(senhaHash);
            System.out.println(usuario.toString());
            usuarioRepository.save(usuario);
            //utx.commit();
        } catch (Exception e) {
            System.out.println("erro: "+e.getMessage());
            //utx.rollback();
            //return e.getMessage();
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
