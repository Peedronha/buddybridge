package br.com.buddybridge.core.Employee.model;


import br.com.buddybridge.core.Employee.entity.EmployeeModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class VolunteerDto {

    private String nome_voluntario;
    private String email;

    private String cpf_voluntario;

    private String cnpj_voluntario;

    private String cargo_voluntario;

    private String descricao_atividades_voluntario;

    private String pf_pj_voluntario;

    public VolunteerDto(EmployeeModel volunteer) {
                this.cargo_voluntario = volunteer.getCargo_voluntario();
                this.cnpj_voluntario = volunteer.getCnpj_voluntario();
                this.cpf_voluntario = volunteer.getCpf_voluntario();
                this.email = volunteer.getEmail();
                this.nome_voluntario = volunteer.getNome_voluntario();
                this.descricao_atividades_voluntario = volunteer.getDescricao_atividades_voluntario();
                this.pf_pj_voluntario = volunteer.getPf_pj_voluntario();
    }
}
