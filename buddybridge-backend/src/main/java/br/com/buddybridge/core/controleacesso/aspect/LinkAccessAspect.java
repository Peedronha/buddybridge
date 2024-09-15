package br.com.buddybridge.core.controleacesso.aspect;

import br.com.buddybridge.core.controleacesso.annotation.LinkAccess;
import br.com.buddybridge.core.controleacesso.util.AccessDeniedException;
import br.com.buddybridge.core.usuario.entity.Usuario;
import br.com.buddybridge.core.usuario.service.UsuarioService;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Aspect
@Order(1)
@Component
public class LinkAccessAspect {

    @Autowired
    private UsuarioService userService;

    @Before("@annotation(linkAccess)")
    public void checkAccess(LinkAccess linkAccess) {

        System.out.println("entreiii");

        Usuario currentUser = userService.getCurrentUser();

        System.out.println("currentUser teeem"+currentUser.getNome());

        if ("ADMIN".equals(currentUser.getRole())) {
            return;
        } else if ("USER".equals(currentUser.getRole())) {
            boolean hasAccess = userService.hasAccess(currentUser, linkAccess.tela(), linkAccess.metodo());
            if (!hasAccess) {
                //throw new AccessDeniedException(linkAccess.tela(), linkAccess.metodo());
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "ACESSO não reconhecida.");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Role não reconhecida.");
        }
    }
}

