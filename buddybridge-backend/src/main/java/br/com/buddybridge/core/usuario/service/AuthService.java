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

        Usuario usuario = userRepository.findByLogin(request.getUsername()).orElseThrow();
        boolean gerarLogin = true;
        if(request.getOtp() != null && request.getOtp() != ""){
            if(usuario.getToken().equals(request.getOtp())){
                usuario.setConfirmacaoEmail(false);
                usuario = userRepository.save(usuario);
            } else {
                gerarLogin = false;
            }
        }
        //Crio o retorno
        AuthResponse response = new AuthResponse();

        if(gerarLogin) {
            UserDetails user = userRepository.findByLogin(request.getUsername()).orElseThrow();
            String token = jwtService.getToken(user);
            response.setToken(token);
            response.setValid(true);
        } else {
            response.setToken(null);
            response.setValid(false);
        }
        response.setIdUser(usuario.getId().toString());
        response.setLogin(usuario.getLogin());
        response.setValidarEmail(usuario.getConfirmacaoEmail());
        return response;
    }

    public AuthResponse isTokenValid(Long id, String token) {
        Usuario usuario = userRepository.getById(id);
        UserDetails user = userRepository.findByLogin(usuario.getLogin()).orElseThrow();

        AuthResponse response = new AuthResponse();

        response.setIdUser(usuario.getId().toString());
        response.setLogin(usuario.getLogin());
        if (jwtService.isTokenValid(token, user)){
            response.setToken(token);
            response.setIdUser(usuario.getId().toString());
            response.setLogin(usuario.getLogin());
            response.setValid(true);
            response.setValidarEmail(usuario.getConfirmacaoEmail());
        } else {
            response.setToken(token);
            response.setIdUser(null);
            response.setLogin(null);
            response.setValid(false);
            response.setValidarEmail(usuario.getConfirmacaoEmail());
        }
        return response;
    }

}
