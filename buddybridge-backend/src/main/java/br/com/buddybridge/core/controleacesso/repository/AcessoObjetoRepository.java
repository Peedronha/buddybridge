package br.com.buddybridge.core.controleacesso.repository;

import br.com.buddybridge.core.controleacesso.entity.Acesso;
import br.com.buddybridge.core.controleacesso.entity.AcessoObjeto;
import br.com.buddybridge.core.controleacesso.entity.GrupoAcesso;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;


public interface AcessoObjetoRepository extends JpaRepository<AcessoObjeto,Long> {

    @Query("SELECT ao.acessoAcessoObjeto FROM AcessoObjeto ao WHERE ao.grupoAcessoAcessoObejto.idGrupoAcesso = :idGrupoAcesso")
    List<Acesso> findAcessosByGrupoAcessoId(@Param("idGrupoAcesso") Long idGrupoAcesso);

    @Modifying
    @Transactional
    @Query("DELETE FROM AcessoObjeto ao WHERE ao.grupoAcessoAcessoObejto.id = :idGrupoAcesso")
    void deleteByGrupoAcessoId(@Param("idGrupoAcesso") Long idGrupoAcesso);

    // Busca por grupo de acesso e acesso
    Optional<AcessoObjeto> findByGrupoAcessoAcessoObejtoAndAcessoAcessoObjeto(GrupoAcesso grupoAcesso, Acesso acesso);

}
