package br.com.buddybridge.core.usuario.controller;


import br.com.buddybridge.core.usuario.entity.Usuario;
import br.com.buddybridge.core.usuario.service.UsuarioService;
import br.com.buddybridge.core.util.ExampleExeption;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.SystemException;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/usuario")
/*@SecurityScheme(
        name = "Bearer",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer"
)*/
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    @PostMapping("/salvar")
    public ResponseEntity<?> salvar(@RequestBody Usuario usuario) throws ExampleExeption, SystemException {
        System.out.println("este metodo foi chamado" + usuario.toString());
        usuarioService.salvar(usuario);
        System.out.println("foi?");
        return new ResponseEntity<>(usuario, HttpStatus.CREATED);
    }

    @GetMapping("/listarAll")
    public List<Usuario> listar() {
        return usuarioService.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable("id") Long id) {
        try {
            Usuario usuario = usuarioService.buscarPorId(id);
            return new ResponseEntity<>(usuario, HttpStatus.OK);
        } catch (NoSuchElementException ex) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable("id") Long id) {
        usuarioService.excluir(id);
    }

}
