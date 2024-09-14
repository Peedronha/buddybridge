package br.com.buddybridge.core.colaborador.entity;

import br.com.buddybridge.core.usuario.entity.Usuario;
import jakarta.persistence.*;
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

    @Column(name = "cpf_colaborador")
    private String cpf_colaborador;

    @Column(name = "cnpj_colaborador")
    private String cnpj_colaborador;

    @Column(name = "cargo_colaborador")
    private String cargo_colaborador;

    @Column(name = "descricao_atividades_colaborador", columnDefinition = "LONGTEXT")
    private String descricao_atividades_colaborador;

    @Column(name = "pf_pj_colaborador", nullable = false)
    private String pf_pj_colaborador;

    @ManyToOne
    @JoinColumn(name="usuario_id", referencedColumnName="id")
    private Usuario usuarioColaborador;

}
