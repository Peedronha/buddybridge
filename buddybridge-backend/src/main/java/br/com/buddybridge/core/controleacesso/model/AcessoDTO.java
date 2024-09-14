package br.com.buddybridge.core.controleacesso.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AcessoDTO {

    private Long idAcesso;
    private String moduloAcesso;
    private String telaAcesso;
    private String descricaoAcesso;
    private boolean ativoAcesso;

}
