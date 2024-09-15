package br.com.buddybridge.core.controleacesso.controller;


import br.com.buddybridge.core.controleacesso.entity.Acesso;
import br.com.buddybridge.core.controleacesso.entity.GrupoAcesso;
import br.com.buddybridge.core.controleacesso.entity.SolicitacaoAcesso;
import br.com.buddybridge.core.controleacesso.model.AcessoDTO;
import br.com.buddybridge.core.controleacesso.model.GrupoAcessoDTO;
import br.com.buddybridge.core.controleacesso.service.GrupoAcessoService;

import br.com.buddybridge.core.usuario.entity.Usuario;
import br.com.buddybridge.core.usuario.service.UsuarioService;
import br.com.buddybridge.core.util.ExampleExeption;
import jakarta.transaction.SystemException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("grupoacesso")
public class GrupoAcessoController {

    private GrupoAcessoService grupoAcessoService;
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<GrupoAcesso> insertGrupoAcesso(@RequestBody GrupoAcessoDTO grupoAcessoDto){
        try{
            GrupoAcesso grupoAcesso = this.grupoAcessoService.saveGrupoAcesso(grupoAcessoDto);
            return new ResponseEntity<>(grupoAcesso, HttpStatus.CREATED);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity<GrupoAcesso> updateGrupoAcesso(@RequestBody GrupoAcessoDTO grupoAcessoDto) throws SystemException, ExampleExeption {
        try{
            GrupoAcesso grupoAcesso = this.grupoAcessoService.updateGrupoAcesso(grupoAcessoDto);
            return new ResponseEntity<>(grupoAcesso, HttpStatus.CREATED);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteGrupoAcesso(@PathVariable Long id){
        if (this.grupoAcessoService.findGrupoAcessoById(id).isPresent()){
            this.grupoAcessoService.deleteGrupoAcesso(id);
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping
    public ResponseEntity<List<GrupoAcesso>> getALlGrupoAcessos(){
        List<GrupoAcesso> GrupoAcessos = new ArrayList<>(this.grupoAcessoService.findAll());
        if (GrupoAcessos.isEmpty()) {
            return new ResponseEntity<>(GrupoAcessos, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ArrayList<> (GrupoAcessos), HttpStatus.OK);
    }

    @GetMapping("/ativos")
    public ResponseEntity<List<GrupoAcesso>> getGruposAcessoAtivo(){
        List<GrupoAcesso> GrupoAcessos = new ArrayList<>(this.grupoAcessoService.getGruposAcessoAtivo());
        if (GrupoAcessos.isEmpty()) {
            return new ResponseEntity<>(GrupoAcessos, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ArrayList<> (GrupoAcessos), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GrupoAcesso> getGrupoAcessoById(@PathVariable Long id){
        Optional<GrupoAcesso> grupoAcesso = this.grupoAcessoService.findGrupoAcessoById(id);
        return grupoAcesso.map(model -> new ResponseEntity<>(model, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null,HttpStatus.NOT_FOUND));
    }

    @GetMapping("/acessos")
    public ResponseEntity<List<AcessoDTO>> getAllAcessos(){
        List<Acesso> acessos = new ArrayList<>(this.grupoAcessoService.findAllAcessos());
        List<AcessoDTO> toReturn = new ArrayList<>();
        if(acessos != null && !acessos.isEmpty()){
            for (Acesso acesso : acessos) {
                AcessoDTO acessoDTO = new AcessoDTO(acesso.getIdAcesso(), acesso.getModuloAcesso(), acesso.getTelaAcesso(), acesso.getDescricaoAcesso(), false);
                toReturn.add(acessoDTO);
            }
        }
        if (acessos.isEmpty()) {
            return new ResponseEntity<>(toReturn, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ArrayList<> (toReturn), HttpStatus.OK);
    }

    @GetMapping("/acesso/{id}")
    public ResponseEntity<List<AcessoDTO>> getAcessosByGrupoAcessoId(@PathVariable Long id){
        List<Acesso> acessos = new ArrayList<>(this.grupoAcessoService.findAllAcessos());
        List<Acesso> acessosConsedidos = new ArrayList<>(this.grupoAcessoService.findAcessosByGrupoAcessoId(id));
        List<AcessoDTO> toReturn = new ArrayList<>();
        if(acessos != null && !acessos.isEmpty()){
            for (Acesso acesso : acessos) {
                if(acessosConsedidos.contains(acesso)){
                    AcessoDTO acessoDTO = new AcessoDTO(acesso.getIdAcesso(), acesso.getModuloAcesso(), acesso.getTelaAcesso(), acesso.getDescricaoAcesso(), true);
                    toReturn.add(acessoDTO);
                } else {
                    AcessoDTO acessoDTO = new AcessoDTO(acesso.getIdAcesso(), acesso.getModuloAcesso(), acesso.getTelaAcesso(), acesso.getDescricaoAcesso(), false);
                    toReturn.add(acessoDTO);
                }
            }
        }
        if (acessos.isEmpty()) {
            return new ResponseEntity<>(toReturn, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ArrayList<> (toReturn), HttpStatus.OK);
    }

    @GetMapping("/acessostela/{tela}")
    public ResponseEntity<List<AcessoDTO>> getAcessosParaTela(@PathVariable String tela) {
        Usuario userLogado = usuarioService.getCurrentUser();
        List<AcessoDTO> acessos = grupoAcessoService.getAcessosParaTela(tela, userLogado);
        // Sempre retornar 200 OK, mesmo que a lista esteja vazia
        return new ResponseEntity<>(acessos, HttpStatus.OK);
    }

    @PostMapping("/solicitaracesso/{id}")
    public ResponseEntity<Void> solicitarAcesso(@PathVariable Long id) {
        try {
            Usuario userLogado = usuarioService.getCurrentUser();
            grupoAcessoService.solicitarAcesso(id, userLogado);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/menus")
    public List<Acesso> getAllAcessosMenu() {
        Usuario userLogado = usuarioService.getCurrentUser();
        return grupoAcessoService.getAcessoByModulo("Buddy Menu", userLogado);
    }

    @GetMapping("/solicitacoesAcesso")
    public List<SolicitacaoAcesso> getSolicitacoesAcesso() {
        return grupoAcessoService.getSolicitacoesAcesso();
    }

    @GetMapping("/solicitacaoAcesso/{id}")
    public ResponseEntity<SolicitacaoAcesso> getSolicitacoesAcessoById(@PathVariable Long id) {
        Optional<SolicitacaoAcesso> solicitacaoAcesso = Optional.ofNullable(this.grupoAcessoService.getSolicitacoesAcessoById(id));
        return solicitacaoAcesso.map(model -> new ResponseEntity<>(model, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null,HttpStatus.NOT_FOUND));
    }

    @PutMapping("/solicitacaoAcesso/{id}")
    public ResponseEntity<SolicitacaoAcesso> enableDisableSolicitacaoAcesso(@PathVariable Long id) throws SystemException, ExampleExeption {
        try{
            SolicitacaoAcesso solicitacaoAcesso = this.grupoAcessoService.enableDisableSolicitacaoAcesso(id);
            return new ResponseEntity<>(solicitacaoAcesso, HttpStatus.CREATED);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }


}
