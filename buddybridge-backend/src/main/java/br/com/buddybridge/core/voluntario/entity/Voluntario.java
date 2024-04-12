package br.com.buddybridge.core.voluntario.entity;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "voluntario")
public class Voluntario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idvoluntario")
    private Long idVoluntario;

    @Column(name = "cpf_voluntario", length = 255)
    private String cpfVoluntario;

    @Column(name = "cnpj_voluntario", nullable = false, length = 255)
    private String cnpjVoluntario;

    @Column(name = "cargo_voluntario", nullable = false, length = 255)
    private String cargoVoluntario;

    @Column(name = "descricao_atividades_voluntario")
    private String descricaoAtividadesVoluntario;

    @Column(name = "pf_pj_voluntario", nullable = false, length = 45)
    private String pfPjVoluntario;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Voluntario that = (Voluntario) o;
        return Objects.equals(idVoluntario, that.idVoluntario);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idVoluntario);
    }

    public Long getIdVoluntario() {
        return idVoluntario;
    }

    public void setIdVoluntario(Long idVoluntario) {
        this.idVoluntario = idVoluntario;
    }

    public String getCpfVoluntario() {
        return cpfVoluntario;
    }

    public void setCpfVoluntario(String cpfVoluntario) {
        this.cpfVoluntario = cpfVoluntario;
    }

    public String getCnpjVoluntario() {
        return cnpjVoluntario;
    }

    public void setCnpjVoluntario(String cnpjVoluntario) {
        this.cnpjVoluntario = cnpjVoluntario;
    }

    public String getCargoVoluntario() {
        return cargoVoluntario;
    }

    public void setCargoVoluntario(String cargoVoluntario) {
        this.cargoVoluntario = cargoVoluntario;
    }

    public String getDescricaoAtividadesVoluntario() {
        return descricaoAtividadesVoluntario;
    }

    public void setDescricaoAtividadesVoluntario(String descricaoAtividadesVoluntario) {
        this.descricaoAtividadesVoluntario = descricaoAtividadesVoluntario;
    }

    public String getPfPjVoluntario() {
        return pfPjVoluntario;
    }

    public void setPfPjVoluntario(String pfPjVoluntario) {
        this.pfPjVoluntario = pfPjVoluntario;
    }
}
