package br.com.buddybridge.core.controleacesso.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GrupoAcessoDTO {

    private Long idGrupoAcesso;
    private String descricaoGrupoAcesso;
    private boolean ativoGrupoAcesso;
    private List<AcessoDTO> acessos;

}
