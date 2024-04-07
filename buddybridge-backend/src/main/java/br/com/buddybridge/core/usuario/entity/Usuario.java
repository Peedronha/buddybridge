package br.com.buddybridge.core.usuario.entity;

import br.com.buddybridge.core.endereco.entity.Endereco;
import br.com.buddybridge.core.voluntario.entity.Voluntario;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idusuario")
    private Long idUsuario;

    @Column(name = "nome_usuario", nullable = false, length = 255)
    private String nomeUsuario;

    @Column(name = "email_usuario", nullable = false, length = 255, unique = true)
    private String emailUsuario;

    @Column(name = "senha_usuario", nullable = false, length = 255, unique = true)
    private String senhaUsuario;

    @Column(name = "admin_usuario")
    private Boolean adminUsuario;

    @Column(name = "confirmacao_email_usuario")
    private Boolean confirmacaoEmailUsuario;

    @Column(name = "token_usuario", nullable = false, length = 45, unique = true)
    private String tokenUsuario;

    @Column(name = "telefone_usuario", nullable = false, length = 45, unique = true)
    private String telefoneUsuario;

    @ManyToOne
    @JoinColumn(name="endereco_idendereco", referencedColumnName="idendereco")
    private Endereco enderecoIdendereco;

    @ManyToOne
    @JoinColumn(name="voluntario_idvoluntario", referencedColumnName="idvoluntario")
    private Voluntario voluntarioIdvoluntario;

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

    public Boolean getAdminUsuario() {
        return adminUsuario;
    }

    public void setAdminUsuario(Boolean adminUsuario) {
        this.adminUsuario = adminUsuario;
    }

    public Boolean getConfirmacaoEmailUsuario() {
        return confirmacaoEmailUsuario;
    }

    public void setConfirmacaoEmailUsuario(Boolean confirmacaoEmailUsuario) {
        this.confirmacaoEmailUsuario = confirmacaoEmailUsuario;
    }

    public String getTokenUsuario() {
        return tokenUsuario;
    }

    public void setTokenUsuario(String tokenUsuario) {
        this.tokenUsuario = tokenUsuario;
    }

    public String getTelefoneUsuario() {
        return telefoneUsuario;
    }

    public void setTelefoneUsuario(String telefoneUsuario) {
        this.telefoneUsuario = telefoneUsuario;
    }

    public Endereco getEnderecoIdendereco() {
        return enderecoIdendereco;
    }

    public void setEnderecoIdendereco(Endereco enderecoIdendereco) {
        this.enderecoIdendereco = enderecoIdendereco;
    }

    public Voluntario getVoluntarioIdvoluntario() {
        return voluntarioIdvoluntario;
    }

    public void setVoluntarioIdvoluntario(Voluntario voluntarioIdvoluntario) {
        this.voluntarioIdvoluntario = voluntarioIdvoluntario;
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
