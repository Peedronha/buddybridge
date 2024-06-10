package br.com.buddybridge.core.colaborador.entity;

import br.com.buddybridge.core.colaborador.model.ColaboradorDto;
import br.com.buddybridge.core.usuario.entity.Usuario;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "colaborador")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Colaborador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idcolaborador")
    private Long idcolaborador;

    @Column(name = "nome_colaborador")
    private String nome_colaborador;

    @Email
    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "cpf_colaborador")
    private String cpf_colaborador;

    @Column(name = "cnpj_colaborador", unique = true)
    private String cnpj_colaborador;

    @Column(name = "cargo_colaborador", unique = true)
    private String cargo_colaborador;

    @Column(name = "descricao_atividades_colaborador", columnDefinition = "LONGTEXT")
    private String descricao_atividades_colaborador;

    @Column(name = "pf_pj_colaborador", nullable = false)
    private String pf_pj_colaborador;

    @ManyToOne
    @JoinColumn(name="usuario_id", referencedColumnName="id")
    private Usuario usuarioColaborador;

    public Colaborador(ColaboradorDto colaboradorDto) {
        this.cargo_colaborador = colaboradorDto.getCargo_colaborador();
        this.cnpj_colaborador = colaboradorDto.getCnpj_colaborador();
        this.cpf_colaborador = colaboradorDto.getCpf_colaborador();
        this.email = colaboradorDto.getEmail();
        this.nome_colaborador = colaboradorDto.getNome_colaborador();
        this.descricao_atividades_colaborador = colaboradorDto.getDescricao_atividades_colaborador();
        this.pf_pj_colaborador = colaboradorDto.getPf_pj_colaborador();
        this.usuarioColaborador= new Usuario();
    }

}
