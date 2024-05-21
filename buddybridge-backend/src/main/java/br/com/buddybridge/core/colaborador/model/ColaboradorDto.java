package br.com.buddybridge.core.colaborador.model;

import br.com.buddybridge.core.colaborador.entity.Colaborador;
import br.com.buddybridge.core.usuario.entity.Usuario;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ColaboradorDto {

    private String nome_colaborador;

    private String email;

    private String cpf_colaborador;

    private String cnpj_colaborador;

    private String cargo_colaborador;

    private String descricao_atividades_colaborador;

    private String pf_pj_colaborador;

    private Long usuarioColaborador;

    public ColaboradorDto(Colaborador colaborador) {
        this.cargo_colaborador = colaborador.getCargo_colaborador();
        this.cnpj_colaborador = colaborador.getCnpj_colaborador();
        this.cpf_colaborador = colaborador.getCpf_colaborador();
        this.email = colaborador.getEmail();
        this.nome_colaborador = colaborador.getNome_colaborador();
        this.descricao_atividades_colaborador = colaborador.getDescricao_atividades_colaborador();
        this.pf_pj_colaborador = colaborador.getPf_pj_colaborador();
    }
}
