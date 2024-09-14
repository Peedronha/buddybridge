package br.com.buddybridge.core.controleacesso.entity;

import br.com.buddybridge.core.usuario.entity.Usuario;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;

import java.util.Date;

@Entity
@Table(name = "acessoObjeto")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AcessoObjeto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idacessoObjeto")
    private Long idAcessoObjeto;

    @ManyToOne
    @JoinColumn(name="grupoAcesso_acessoObjeto", referencedColumnName="idgrupoAcesso")
    private GrupoAcesso grupoAcessoAcessoObejto;

    @ManyToOne
    @JoinColumn(name="acesso_acessoObjeto", referencedColumnName="idacesso")
    private Acesso acessoAcessoObjeto;



}
