package br.com.buddybridge.core.endereco.entity;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "endereco")
public class Endereco {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idendereco")
    private Long idEndereco;

    @Column(name = "logradouro_endereco", nullable = false, length = 255)
    private String logradouroEndereco;

    @Column(name = "numero_endereco", nullable = false, length = 45)
    private String numeroEndereco;

    @Column(name = "cidade_endereco", nullable = false, length = 255)
    private String cidadeEndereco;

    @Column(name = "estado_endereco", nullable = false, length = 255)
    private String estadoEndereco;

    @Column(name = "pais_endereco", nullable = false, length = 255)
    private String paisEndereco;

    @Column(name = "cep_endereco", length = 45)
    private String cepEndereco;

    @Column(name = "bairro_endereco", nullable = false, length = 255)
    private String bairroEndereco;

    @Column(name = "complemento_endereco")
    private String complemento_endereco;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Endereco endereco = (Endereco) o;
        return Objects.equals(idEndereco, endereco.idEndereco);
    }

    public Long getIdEndereco() {
        return idEndereco;
    }

    public void setIdEndereco(Long idEndereco) {
        this.idEndereco = idEndereco;
    }

    public String getLogradouroEndereco() {
        return logradouroEndereco;
    }

    public void setLogradouroEndereco(String logradouroEndereco) {
        this.logradouroEndereco = logradouroEndereco;
    }

    public String getNumeroEndereco() {
        return numeroEndereco;
    }

    public void setNumeroEndereco(String numeroEndereco) {
        this.numeroEndereco = numeroEndereco;
    }

    public String getCidadeEndereco() {
        return cidadeEndereco;
    }

    public void setCidadeEndereco(String cidadeEndereco) {
        this.cidadeEndereco = cidadeEndereco;
    }

    public String getEstadoEndereco() {
        return estadoEndereco;
    }

    public void setEstadoEndereco(String estadoEndereco) {
        this.estadoEndereco = estadoEndereco;
    }

    public String getPaisEndereco() {
        return paisEndereco;
    }

    public void setPaisEndereco(String paisEndereco) {
        this.paisEndereco = paisEndereco;
    }

    public String getCepEndereco() {
        return cepEndereco;
    }

    public void setCepEndereco(String cepEndereco) {
        this.cepEndereco = cepEndereco;
    }

    public String getBairroEndereco() {
        return bairroEndereco;
    }

    public void setBairroEndereco(String bairroEndereco) {
        this.bairroEndereco = bairroEndereco;
    }

    public String getComplemento_endereco() {
        return complemento_endereco;
    }

    public void setComplemento_endereco(String complemento_endereco) {
        this.complemento_endereco = complemento_endereco;
    }
}
