package br.com.buddybridge.core.controleacesso.repository;

import br.com.buddybridge.core.controleacesso.entity.GrupoAcesso;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GrupoAcessoRepository extends JpaRepository<GrupoAcesso,Long> {

    // Método que busca todos os grupos de acesso onde o campo 'ativo' é true
    List<GrupoAcesso> findByAtivoGrupoAcessoTrue();

}
