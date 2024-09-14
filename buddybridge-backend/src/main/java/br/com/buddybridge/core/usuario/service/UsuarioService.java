package br.com.buddybridge.core.usuario.service;


import br.com.buddybridge.core.colaborador.entity.Colaborador;
import br.com.buddybridge.core.controleacesso.entity.Acesso;
import br.com.buddybridge.core.controleacesso.entity.GrupoAcesso;
import br.com.buddybridge.core.controleacesso.service.GrupoAcessoService;
import br.com.buddybridge.core.email.service.EmailService;
import br.com.buddybridge.core.ong.entity.Ong;
import br.com.buddybridge.core.ong.service.OngService;
import br.com.buddybridge.core.security.jwt.JwtService;
import br.com.buddybridge.core.security.config.SecurityConfig;
import br.com.buddybridge.core.usuario.entity.Role;
import br.com.buddybridge.core.usuario.entity.Usuario;
import br.com.buddybridge.core.usuario.repository.UsuarioRepository;
import br.com.buddybridge.core.util.ExampleExeption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
import java.util.concurrent.CompletableFuture;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private GrupoAcessoService grupoAcessoService;
    @Autowired
    private OngService ongService;
    @Resource
    private UserTransaction utx;

    public Usuario inativarUser(Usuario usuario) {
        System.out.println("entreiiiiiii");
        usuario.setConfirmacaoEmail(true);
        return usuarioRepository.save(usuario);
    }

    public Usuario salvar(Usuario usuario, Boolean colaborador) throws ExampleExeption, SystemException {
        if (usuario.getNome() == null || usuario.getNome().isEmpty()) {
            throw new ExampleExeption("O nome é uma informação obrigatória. ", "ERRO001");
        }
        if(usuarioRepository.findByLogin(usuario.getLogin()).isPresent()){
            throw new ExampleExeption("O email informado já possui uma conta no sistema. ", "ERRO001");
        }
        try {
            if (usuario.getId() == null) {
                usuario.setConfirmacaoEmail(true);
                usuario.setToken(gerarNumeroSeisDigitos());
                CompletableFuture.runAsync(() -> {

                    String message = "Seja bem vindo a BuddyBridge - para acessar o sistema usar o seguinte código OTP: " + usuario.getToken();
                    if (colaborador){
                        message = message.concat("\nSua senha inicial é: " + usuario.getSenha()+"\n<a>http://localhost:4200/validatelogin</a>"+ "\nVocê pode altera-la nas configurações de perfil.");
                    }

                    emailService.enviarEmailTexto(usuario.getLogin(), "BuddyBridge - Token de Acesso ao Sistema", message);
                });
            }
            //Criptografando a senha
            if (usuario.getSenha() != null && !usuario.getSenha().isEmpty()) {
                String senhaHash = this.bCryptPasswordEncoder().encode(usuario.getSenha());
                usuario.setSenha(senhaHash);
            } else if (usuario.getId() != null) {
                Usuario origin = usuarioRepository.getReferenceById(usuario.getId());
                usuario.setSenha(origin.getSenha());
            }

            if(usuario.getGrupoAcessoUsuario() == null){
                Ong ong = ongService.buscarPorId(Long.valueOf(1));
                if(colaborador) {
                    if (ong.getGrupoAcessoColaborador() != null){
                        usuario.setGrupoAcessoUsuario(ong.getGrupoAcessoColaborador());
                    }
                } else {
                    if (ong.getGrupoAcessoAdotante() != null){
                        usuario.setGrupoAcessoUsuario(ong.getGrupoAcessoAdotante());
                    }
                }
            }

            usuario.setRole(Role.USER.name());
            return usuarioRepository.save(usuario);
        } catch (Exception e) {
            throw new SystemException(String.valueOf(e));
        }
    }

    public Usuario update(Usuario usuario) throws ExampleExeption, SystemException {
        if (usuario.getNome() == null || usuario.getNome().isEmpty()) {
            throw new ExampleExeption("O nome é uma informação obrigatória. ", "ERRO001");
        }
        if (usuario.getSenha() != null && !usuario.getSenha().isEmpty()) {
            String senhaHash = this.bCryptPasswordEncoder().encode(usuario.getSenha());
            usuario.setSenha(senhaHash);
        } else if (usuario.getId() != null) {
            Usuario origin = usuarioRepository.getReferenceById(usuario.getId());
            usuario.setSenha(origin.getSenha());
        }
        return usuarioRepository.save(usuario);
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

    public Usuario getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            return usuarioRepository.findByLogin(userDetails.getUsername()).get();
        }
        return null;
    }

    public boolean hasAccess(Usuario usuario, String tela, String metodo) {
        // Verificar se o usuário tem o papel de ADMIN
        if ("ADMIN".equalsIgnoreCase(usuario.getRole())) {
            return true; // ADMIN tem acesso a tudo
        }

        // Caso o usuário seja um USER, verificar os acessos conforme o grupo de acesso
        if ("USER".equalsIgnoreCase(usuario.getRole())) {
            // Carregar o grupo de acesso do usuário
            Optional<GrupoAcesso> grupoAcesso = grupoAcessoService.findGrupoAcessoById(usuario.getGrupoAcessoUsuario().getIdGrupoAcesso());

            if (grupoAcesso.isPresent()) {
                // Buscar os acessos do grupo relacionados à tela e método
                Optional<Acesso> acesso = grupoAcessoService.getAcessoByTelaAndMetodo(tela, metodo);

                return acesso.isPresent();
            }
        }

        // Retornar falso caso o usuário não tenha permissões
        return false;
    }
}
