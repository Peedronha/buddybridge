package br.com.buddybridge.core.usuario.controller;

import br.com.buddybridge.core.ong.entity.Ong;
import br.com.buddybridge.core.security.jwt.JwtService;
import br.com.buddybridge.core.usuario.entity.Usuario;
import br.com.buddybridge.core.usuario.model.AuthRequest;
import br.com.buddybridge.core.usuario.model.AuthResponse;
import br.com.buddybridge.core.usuario.model.LoginRequest;
import br.com.buddybridge.core.usuario.service.AuthService;
import br.com.buddybridge.core.usuario.service.UsuarioService;
import br.com.buddybridge.core.util.ExampleExeption;
import jakarta.transaction.SystemException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticationController {

    private final AuthService authService;
    private final UsuarioService userService;

    @PostMapping("/salvar")
    public ResponseEntity<?> salvar(@RequestBody Usuario usuario) throws ExampleExeption, SystemException {
        userService.salvar(usuario, false);
        return new ResponseEntity<>(usuario, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }

    @PostMapping("/enviarTokenRecuperacao")
    public ResponseEntity<?> enviarTokenRecuperacao(@RequestBody LoginRequest loginRequest) throws ExampleExeption, SystemException {
        userService.recuperarSenha(loginRequest.getUsername());
        return new ResponseEntity<>(loginRequest, HttpStatus.OK);
    }

    @GetMapping("/validarToken/{id}/{token}")
    public ResponseEntity<AuthResponse> isTokenValid(@PathVariable("id") Long id, @PathVariable("token") String token) {
        return ResponseEntity.ok(authService.isTokenValid(id, token));
    }

    @GetMapping("/isBackEndOn")
    public ResponseEntity<Boolean> isBackEndOn() {
        return ResponseEntity.ok(Boolean.TRUE);
    }


}
