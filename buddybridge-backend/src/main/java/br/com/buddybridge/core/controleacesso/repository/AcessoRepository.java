package br.com.buddybridge.core.controleacesso.repository;

import br.com.buddybridge.core.controleacesso.entity.Acesso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface AcessoRepository extends JpaRepository<Acesso,Long> {

    boolean existsByModuloAcessoAndTelaAcessoAndDescricaoAcesso(String moduloAcesso, String telaAcesso, String descricaoAcesso);

    @Query("SELECT ace FROM Acesso ace WHERE ace.telaAcesso = :tela AND ace.tipoAcesso = :metodo")
    Optional<Acesso> getAcessoByTelaAndMetodo(@Param("tela") String tela, @Param("metodo") String metodo);

    List<Acesso> findByModuloAcesso(String moduloAcesso);

    List<Acesso> findByTelaAcesso(String tela);
}
