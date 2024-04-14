package br.com.buddybridge.core.usuario.service;


import br.com.buddybridge.core.email.service.EmailService;
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

import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private EmailService emailService;
    @Resource
    private UserTransaction utx;

    @Transactional(value = Transactional.TxType.REQUIRES_NEW)
    public void salvar(Usuario usuario) throws ExampleExeption, SystemException {
        try {
            utx.begin();

            if(usuario.getNome() == null && usuario.getNome().equals("")){
                throw new ExampleExeption("O nome é uma informação obrigatória. ", "ERRO001");
            }


            if(usuario.getId() == null) {
                usuario.setConfirmacaoEmail(true);
                usuario.setToken(gerarNumeroSeisDigitos());
                emailService.enviarEmailTexto(usuario.getLogin(),
                        "BuddyBridge - Token de Acesso ao Sistema",
                        "Seja bem vindo a BuddyBridge - para acessar o sistema usar o seguinte código OTP: "+usuario.getToken());
            }

            System.out.println("senha"+usuario.getSenha());
            if(usuario.getSenha() != null && usuario.getSenha() != "") {
                String senhaHash = this.bCryptPasswordEncoder().encode(usuario.getSenha());
                usuario.setSenha(senhaHash);
                System.out.println(senhaHash);
            } else {
                if(usuario.getId() != null){
                    Usuario origin = usuarioRepository.getReferenceById(usuario.getId());
                    usuario.setSenha(origin.getSenha());
                }
            }
            System.out.println("senha"+usuario.getSenha());
            usuarioRepository.save(usuario);
            utx.commit();
        } catch (Exception e) {
            //return e.getMessage()
            utx.rollback();
        }
    }

    public void recuperarSenha(String email){
        Usuario usuario = usuarioRepository.findByLogin(email).orElseThrow();
        if(usuario != null) {

            String newPassword = generatePassword(8);
            String senhaHash = this.bCryptPasswordEncoder().encode(newPassword);
            usuario.setSenha(senhaHash);
            usuario.setConfirmacaoEmail(true);
            usuario.setToken(gerarNumeroSeisDigitos());

            usuarioRepository.save(usuario);

            emailService.enviarEmailTexto(usuario.getLogin(),
                    "BuddyBridge - Recuperação de Senha",
                    "Para acessar o sistema usar as seguinte informações: Senha:" + newPassword  + ", Código OTP: "+usuario.getToken());
        }
    }

    public static String gerarNumeroSeisDigitos() {
        Random random = new Random();
        int numero = random.nextInt(900000) + 100000;
        return Integer.toString(numero);
    }

    public static String generatePassword(int length) {
        // Caracteres possíveis na senha: letras maiúsculas, minúsculas e números
        String charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        // Instância de SecureRandom para geração segura
        Random random = new Random();

        // StringBuilder para construir a senha
        StringBuilder sb = new StringBuilder();

        // Loop para escolher 'length' caracteres aleatórios do conjunto
        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(charSet.length());
            sb.append(charSet.charAt(randomIndex));
        }

        return sb.toString();
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
