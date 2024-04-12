package br.com.buddybridge.core.usuario.entity;

import br.com.buddybridge.core.endereco.entity.Endereco;
import br.com.buddybridge.core.voluntario.entity.Voluntario;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "usuario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario implements UserDetails {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nome", nullable = false, length = 255)
    private String nome;

    @Column(name = "login", nullable = false, length = 255, unique = true)
    private String login;

    @Column(name = "senha", nullable = false, length = 255)
    private String senha;

    private Set<Role> authorities;

    @Column(name = "confirmacao_email")
    private Boolean confirmacaoEmail;

    @Column(name = "token", nullable = false, length = 45)
    private String token;

    @Column(name = "telefone", nullable = false, length = 45)
    private String telefone;

    @ManyToOne
    @JoinColumn(name="usuario_idendereco", referencedColumnName="idendereco")
    private Endereco usuarioIdendereco;

    @ManyToOne
    @JoinColumn(name="usuario_idvoluntario", referencedColumnName="idvoluntario")
    private Voluntario usuarioIdvoluntario;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Usuario usuario = (Usuario) o;
        return Objects.equals(id, usuario.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
       return authorities;
    }

    @Override
    public String getPassword() {
        return getSenha();
    }

    @Override
    public String getUsername() {
        return getLogin();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
