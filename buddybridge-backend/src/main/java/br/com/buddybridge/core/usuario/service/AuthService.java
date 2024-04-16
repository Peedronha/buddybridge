package br.com.buddybridge.core.usuario.service;

import br.com.buddybridge.core.security.jwt.JwtService;
import br.com.buddybridge.core.usuario.entity.Usuario;
import br.com.buddybridge.core.usuario.model.AuthRequest;
import br.com.buddybridge.core.usuario.model.AuthResponse;
import br.com.buddybridge.core.usuario.model.LoginRequest;
import br.com.buddybridge.core.usuario.model.RegisterRequest;
import br.com.buddybridge.core.usuario.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UsuarioRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserDetails user = userRepository.findByLogin(request.getUsername()).orElseThrow();
        Usuario usuario = userRepository.findByLogin(request.getUsername()).orElseThrow();
        String token = jwtService.getToken(user);

        if(request.getOtp() != null && request.getOtp() != ""){
            if(usuario.getToken().equals(request.getOtp())){
                usuario.setConfirmacaoEmail(false);
                usuario = userRepository.save(usuario);
            }
        }

        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setIdUser(usuario.getId().toString());
        response.setLogin(usuario.getLogin());
        response.setValid(true);
        response.setValidarEmail(usuario.getConfirmacaoEmail());
        return response;
    }

    public AuthResponse isTokenValid(AuthRequest authRequest) {
        UserDetails user = userRepository.findByLogin(authRequest.getLogin()).orElseThrow();
        Usuario usuario = userRepository.findByLogin(authRequest.getLogin()).orElseThrow();
        AuthResponse response = new AuthResponse();
        response.setToken(authRequest.getToken());
        response.setIdUser(usuario.getId().toString());
        response.setLogin(usuario.getLogin());
        if (jwtService.isTokenValid(authRequest.getToken(), user)){
            System.out.println("é valido");
            response.setValid(true);
        } else {
            System.out.println("não é valido");
            response.setValid(false);
        }
        return response;
    }

}
