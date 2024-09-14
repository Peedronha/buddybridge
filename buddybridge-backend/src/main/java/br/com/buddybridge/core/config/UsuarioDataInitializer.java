package br.com.buddybridge.core.config;

import br.com.buddybridge.core.usuario.entity.Role;
import br.com.buddybridge.core.usuario.entity.Usuario;
import br.com.buddybridge.core.usuario.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Component
public class UsuarioDataInitializer implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepositorio;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (usuarioRepositorio.count() == 0) {
            Usuario admin = new Usuario();
            admin.setNome("Administrador");
            admin.setLogin("admin@buddybridge.com");
            admin.setRole(Role.ADMIN.name());
            admin.setSenha("$2a$10$QzBRrvJ4JTdUuNKLXhBnCuu71P5T.Zs/W//KFZkdykXGHdl0AIhQW"); //admin
            admin.setConfirmacaoEmail(false);
            admin.setToken("111111");
            usuarioRepositorio.save(admin);

            Usuario usuario1 = new Usuario();
            usuario1.setNome("Teste BuddyBridge");
            usuario1.setLogin("teste@buddybridge.com");
            usuario1.setRole(Role.USER.name());
            usuario1.setSenha("$2a$10$QzBRrvJ4JTdUuNKLXhBnCuu71P5T.Zs/W//KFZkdykXGHdl0AIhQW"); //admin
            usuario1.setConfirmacaoEmail(false);
            usuario1.setToken("111111");
            usuarioRepositorio.save(usuario1);
        }



    }
}

