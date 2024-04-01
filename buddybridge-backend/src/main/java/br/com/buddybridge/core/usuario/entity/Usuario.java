package br.com.buddybridge.core.usuario.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long idUsuario;

    @NotNull(message = "O nome é uma informação obrigatória")
    @Column(name = "nome_usuario", nullable = false, length = 255)
    private String nomeUsuario;

    @NotNull(message = "O e-mail é uma informação obrigatória")
    @Column(name = "email_usuario", nullable = false, length = 255, unique = true)
    private String emailUsuario;

    @NotNull(message = "A senha é uma informação obrigatória")
    @Column(name = "senha_usuario", nullable = false, length = 255, unique = true)
    private String senhaUsuario;

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }

    public void setNomeUsuario(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
    }

    public String getEmailUsuario() {
        return emailUsuario;
    }

    public void setEmailUsuario(String emailUsuario) {
        this.emailUsuario = emailUsuario;
    }

    public String getSenhaUsuario() {
        return senhaUsuario;
    }

    public void setSenhaUsuario(String senhaUsuario) {
        this.senhaUsuario = senhaUsuario;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Usuario)) return false;
        Usuario usuario = (Usuario) o;
        return getIdUsuario().equals(usuario.getIdUsuario());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getIdUsuario());
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "idUsuario=" + idUsuario +
                ", nomeUsuario='" + nomeUsuario + '\'' +
                ", emailUsuario='" + emailUsuario + '\'' +
                ", senhaUsuario='" + senhaUsuario + '\'' +
                '}';
    }
}
