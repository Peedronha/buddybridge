package br.com.buddybridge.core.Employee.entity;

import br.com.buddybridge.core.Employee.model.VolunteerDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "voluntario")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idvoluntario")
    private Integer idvoluntario;

    @Column(name = "nome_voluntario")
    private String nome_voluntario;

    @Email
    @Column(name = "email")
    private String email;

    @Column(name = "cpf_voluntario")
    private String cpf_voluntario;

    @Column(name = "cnpj_voluntario")
    private String cnpj_voluntario;

    @Column(name = "cargo_voluntario", nullable = false)
    private String cargo_voluntario;

    @Column(name = "descricao_atividades_voluntario", columnDefinition = "LONGTEXT")
    private String descricao_atividades_voluntario;

    @Column(name = "pf_pj_voluntario", nullable = false)
    private String pf_pj_voluntario;

    public EmployeeModel(VolunteerDto volunteer) {
        this.cargo_voluntario = volunteer.getCargo_voluntario();
        this.cnpj_voluntario = volunteer.getCnpj_voluntario();
        this.cpf_voluntario = volunteer.getCpf_voluntario();
        this.email = volunteer.getEmail();
        this.nome_voluntario = volunteer.getNome_voluntario();
        this.descricao_atividades_voluntario = volunteer.getDescricao_atividades_voluntario();
        this.pf_pj_voluntario = volunteer.getPf_pj_voluntario();
    }

}
