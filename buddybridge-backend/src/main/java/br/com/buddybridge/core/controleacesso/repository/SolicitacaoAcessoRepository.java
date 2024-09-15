package br.com.buddybridge.core.controleacesso.repository;

import br.com.buddybridge.core.controleacesso.entity.Acesso;
import br.com.buddybridge.core.controleacesso.entity.AcessoObjeto;
import br.com.buddybridge.core.controleacesso.entity.GrupoAcesso;
import br.com.buddybridge.core.controleacesso.entity.SolicitacaoAcesso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface SolicitacaoAcessoRepository extends JpaRepository<SolicitacaoAcesso,Long> {

    Optional<SolicitacaoAcesso> findByGrupoAcessoAcessoObejtoAndAcessoAcessoObjeto(GrupoAcesso grupoAcesso, Acesso acesso);

}
