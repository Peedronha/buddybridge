package br.com.buddybridge.core.controleacesso.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "solicitacaoAcesso")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SolicitacaoAcesso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idsolicitacaoAcesso")
    private Long idsolicitacaoAcesso;

    @ManyToOne
    @JoinColumn(name="grupoAcesso_solicitacaoAcesso", referencedColumnName="idgrupoAcesso")
    private GrupoAcesso grupoAcessoAcessoObejto;

    @ManyToOne
    @JoinColumn(name="acesso_solicitacaoAcesso", referencedColumnName="idacesso")
    private Acesso acessoAcessoObjeto;

    @Column(name = "delegadoSolicitacaoAcesso", nullable = false, columnDefinition = "boolean default false")
    private boolean delegadoSolicitacaoAcesso = false;
}
