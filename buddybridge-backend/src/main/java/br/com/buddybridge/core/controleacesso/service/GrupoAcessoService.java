package br.com.buddybridge.core.controleacesso.service;

import br.com.buddybridge.core.colaborador.entity.Colaborador;
import br.com.buddybridge.core.controleacesso.controller.AccessLoader;
import br.com.buddybridge.core.controleacesso.entity.Acesso;
import br.com.buddybridge.core.controleacesso.entity.AcessoObjeto;
import br.com.buddybridge.core.controleacesso.entity.GrupoAcesso;
import br.com.buddybridge.core.controleacesso.entity.SolicitacaoAcesso;
import br.com.buddybridge.core.controleacesso.model.AcessoDTO;
import br.com.buddybridge.core.controleacesso.model.GrupoAcessoDTO;
import br.com.buddybridge.core.controleacesso.repository.AcessoObjetoRepository;
import br.com.buddybridge.core.controleacesso.repository.AcessoRepository;
import br.com.buddybridge.core.controleacesso.repository.GrupoAcessoRepository;
import br.com.buddybridge.core.controleacesso.repository.SolicitacaoAcessoRepository;
import br.com.buddybridge.core.usuario.entity.Usuario;
import br.com.buddybridge.core.usuario.service.UsuarioService;
import br.com.buddybridge.core.util.ExampleExeption;
import jakarta.annotation.Resource;
import jakarta.transaction.SystemException;
import jakarta.transaction.UserTransaction;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class GrupoAcessoService {
    private GrupoAcessoRepository grupoAcessoRepository;
    private AcessoObjetoRepository acessoObjetoRepository;
    private AcessoRepository acessoRepository;
    private SolicitacaoAcessoRepository solicitacaoAcessoRepository;


    public GrupoAcesso saveGrupoAcesso(GrupoAcessoDTO grupoAcessoDTO){
        //Intancio o grupo de acesso e salvo ele
        GrupoAcesso grupoAcesso = new GrupoAcesso();
        grupoAcesso.setAtivoGrupoAcesso(grupoAcessoDTO.isAtivoGrupoAcesso());
        grupoAcesso.setDescricaoGrupoAcesso(grupoAcessoDTO.getDescricaoGrupoAcesso());
        GrupoAcesso persisted = grupoAcessoRepository.save(grupoAcesso);

        //Salvo os acessos relacionados
        List<AcessoDTO> acessos = grupoAcessoDTO.getAcessos();
        if(acessos != null && !acessos.isEmpty()) {
            for (AcessoDTO acesso : acessos) {
                AcessoObjeto toAdd = new AcessoObjeto();
                toAdd.setAcessoAcessoObjeto(acessoRepository.getReferenceById(acesso.getIdAcesso()));
                toAdd.setGrupoAcessoAcessoObejto(persisted);
                acessoObjetoRepository.save(toAdd);
            }
        }
        return persisted;
    }

    public GrupoAcesso updateGrupoAcesso(GrupoAcessoDTO grupoAcessoDTO){
        //Intancio o grupo de acesso e salvo ele
        GrupoAcesso grupoAcesso = grupoAcessoRepository.getReferenceById(grupoAcessoDTO.getIdGrupoAcesso());
        grupoAcesso.setAtivoGrupoAcesso(grupoAcessoDTO.isAtivoGrupoAcesso());
        grupoAcesso.setDescricaoGrupoAcesso(grupoAcessoDTO.getDescricaoGrupoAcesso());
        GrupoAcesso persisted = grupoAcessoRepository.save(grupoAcesso);

        //Remove todos os acessos anteriores
        acessoObjetoRepository.deleteByGrupoAcessoId(grupoAcessoDTO.getIdGrupoAcesso());

        //Salvo os acessos relacionados
        List<AcessoDTO> acessos = grupoAcessoDTO.getAcessos();
        if(acessos != null && !acessos.isEmpty()) {
            for (AcessoDTO acesso : acessos) {
                AcessoObjeto toAdd = new AcessoObjeto();
                toAdd.setAcessoAcessoObjeto(acessoRepository.getReferenceById(acesso.getIdAcesso()));
                toAdd.setGrupoAcessoAcessoObejto(persisted);
                acessoObjetoRepository.save(toAdd);
            }
        }
        return persisted;
    }

    @Transactional
    public void deleteGrupoAcesso(Long id) {
        acessoObjetoRepository.deleteByGrupoAcessoId(id);
        grupoAcessoRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<GrupoAcesso> findAll() {
        return grupoAcessoRepository.findAll();
    }

    @Transactional
    public Optional<GrupoAcesso> findGrupoAcessoById(Long id) {
        return grupoAcessoRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Acesso> findAllAcessos() {
        return acessoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Acesso> findAcessosByGrupoAcessoId(Long id){
        return acessoObjetoRepository.findAcessosByGrupoAcessoId(id);
    }

    public void carregarEAdicionarAcessos(String filePath) throws IOException {
        AccessLoader loader = new AccessLoader();
        List<Acesso> acessos = loader.carregarAcessosDeArquivo(filePath);
        for (Acesso acesso : acessos) {
            if (!acessoJaExiste(acesso)) {
                acessoRepository.save(acesso);
                System.out.println("Acesso " + acesso.getModuloAcesso() + " - " + acesso.getTelaAcesso() + " foi adicionado.");
            } else {
                System.out.println("Acesso " + acesso.getModuloAcesso() + " - " + acesso.getTelaAcesso() + " já existe e não foi adicionado.");
            }
        }
    }

    public Optional<Acesso> getAcessoByTelaAndMetodo(String tela, String metodo){
        return acessoRepository.getAcessoByTelaAndMetodo(tela, metodo);
    }

    private boolean acessoJaExiste(Acesso acesso) {
        return acessoRepository.existsByModuloAcessoAndTelaAcessoAndDescricaoAcesso(
                acesso.getModuloAcesso(),
                acesso.getTelaAcesso(),
                acesso.getDescricaoAcesso()
        );
    }

    public List<Acesso> getAcessoByModulo(String moduloAcesso, Usuario userLogado) {
        if ("ADMIN".equals(userLogado.getRole())) {
            return acessoRepository.findByModuloAcesso(moduloAcesso);
        }

        // Obter os acessos do módulo especificado
        List<Acesso> acessosMenu = acessoRepository.findByModuloAcesso(moduloAcesso);

        // Obter os acessos do usuário logado baseado no grupo de acesso dele
        List<Acesso> acessosDoUsuario = acessoObjetoRepository.findAcessosByGrupoAcessoId(
                userLogado.getGrupoAcessoUsuario().getIdGrupoAcesso()
        );

        // Filtrar os acessos do módulo que o usuário tem permissão
        List<Acesso> acessosPermitidos = acessosMenu.stream()
                .filter(acesso -> acessosDoUsuario.contains(acesso))
                .collect(Collectors.toList());

        return acessosPermitidos;
    }

    public List<GrupoAcesso> getGruposAcessoAtivo(){
        return grupoAcessoRepository.findByAtivoGrupoAcessoTrue();
    }

    public List<AcessoDTO> getAcessosParaTela(String tela, Usuario userLogado) {

        if ("ADMIN".equals(userLogado.getRole())) {
            return new LinkedList<>();
        }

        // Busca todos os acessos disponíveis para a tela especificada
        List<Acesso> acessosDisponiveis = acessoRepository.findByTelaAcesso(tela);

        // Busca os acessos que o usuário logado já possui

        List<Acesso> acessosDoUsuario = acessoObjetoRepository.findAcessosByGrupoAcessoId(userLogado.getGrupoAcessoUsuario().getIdGrupoAcesso());

        // Filtra os acessos que o usuário ainda não possui
        List<AcessoDTO> acessosNaoPossuidos = acessosDisponiveis.stream()
                .filter(acesso -> !acessosDoUsuario.contains(acesso))
                .map(acesso -> new AcessoDTO(acesso.getIdAcesso(), acesso.getModuloAcesso(), acesso.getTelaAcesso(), acesso.getDescricaoAcesso(), false))
                .collect(Collectors.toList());

        return acessosNaoPossuidos;
    }

    @Transactional
    public void solicitarAcesso(Long idAcesso, Usuario userLogado) {

        System.out.println("id acesso "+idAcesso);
        System.out.println("user logado"+userLogado.getNome());

        Optional<Acesso> acessoOptional = acessoRepository.findById(idAcesso);
        if (acessoOptional.isPresent()) {
            Acesso acesso = acessoOptional.get();
            if (userLogado.getGrupoAcessoUsuario() != null) {
                // Verifica se já existe uma solicitação de acesso para o mesmo grupo de acesso e acesso
                Optional<SolicitacaoAcesso> solicitacaoExistente = solicitacaoAcessoRepository.findByGrupoAcessoAcessoObejtoAndAcessoAcessoObjeto(
                        userLogado.getGrupoAcessoUsuario(), acesso
                );

                if (solicitacaoExistente.isPresent()) {
                    throw new IllegalArgumentException("Já existe uma solicitação de acesso para este grupo e acesso.");
                }

                // Se não existir, salva a nova solicitação de acesso
                SolicitacaoAcesso novo = new SolicitacaoAcesso();
                novo.setGrupoAcessoAcessoObejto(userLogado.getGrupoAcessoUsuario());
                novo.setAcessoAcessoObjeto(acesso);
                solicitacaoAcessoRepository.save(novo);

                System.out.println("Solicitação de acesso ao ID: " + idAcesso);
            }
        } else {
            throw new NoSuchElementException("Acesso não encontrado com ID: " + idAcesso);
        }
    }

    @Transactional(readOnly = true)
    public List<SolicitacaoAcesso> getSolicitacoesAcesso() {
        return solicitacaoAcessoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public SolicitacaoAcesso getSolicitacoesAcessoById(Long id) {
        return solicitacaoAcessoRepository.findById(id).get();
    }

    @Transactional
    public SolicitacaoAcesso enableDisableSolicitacaoAcesso(Long id) throws SystemException {
        // Busca a solicitação de acesso pelo ID
        SolicitacaoAcesso solicitacaoAcesso = getSolicitacoesAcessoById(id);

        // Verifica se já existe um AcessoObjeto para o grupo e acesso da solicitação
        Optional<AcessoObjeto> acessoOptional = acessoObjetoRepository.findByGrupoAcessoAcessoObejtoAndAcessoAcessoObjeto(
                                                    solicitacaoAcesso.getGrupoAcessoAcessoObejto(),
                                                    solicitacaoAcesso.getAcessoAcessoObjeto()
                                                );

        if (acessoOptional.isPresent()) {
            // Se já existe, remover o AcessoObjeto
            AcessoObjeto acessoObjeto = acessoOptional.get();
            acessoObjetoRepository.delete(acessoObjeto);
            solicitacaoAcesso.setDelegadoSolicitacaoAcesso(false);
        } else {
            // Se não existe, criar um novo AcessoObjeto
            AcessoObjeto novoAcessoObjeto = new AcessoObjeto();
            novoAcessoObjeto.setGrupoAcessoAcessoObejto(solicitacaoAcesso.getGrupoAcessoAcessoObejto());
            novoAcessoObjeto.setAcessoAcessoObjeto(solicitacaoAcesso.getAcessoAcessoObjeto());
            acessoObjetoRepository.save(novoAcessoObjeto);
            solicitacaoAcesso.setDelegadoSolicitacaoAcesso(true);
        }

        // Atualizar a solicitação de acesso
        return solicitacaoAcessoRepository.save(solicitacaoAcesso); // Atualizando a entidade no banco
    }


}
