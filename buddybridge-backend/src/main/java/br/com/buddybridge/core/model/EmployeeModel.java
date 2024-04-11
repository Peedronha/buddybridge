package br.com.buddybridge.core.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "employees")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idvoluntario")
    private Integer idVoluntario;

    @Column(name = "cpf_voluntario")
    private String cpfVoluntario;

    @Column(name = "cnpj_coluntario")
    private String cnpjColuntario;

    @Column(name = "cargo_voluntario", nullable = false)
    private String cargoVoluntario;

    @Column(name = "descricao_atividades_voluntario", columnDefinition = "LONGTEXT")
    private String descricaoAtividadesVoluntario;

    @Column(name = "pf_pj_voluntario", nullable = false)
    private String pfPjVoluntario;

    @JoinColumn(name = "ong_id")
    private long ong;
}
