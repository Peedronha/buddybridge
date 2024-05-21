package br.com.buddybridge.core.colaborador.controller;

import br.com.buddybridge.core.colaborador.entity.Colaborador;
import br.com.buddybridge.core.colaborador.model.ColaboradorDto;
import br.com.buddybridge.core.colaborador.service.ColaboradorService;
import br.com.buddybridge.core.usuario.entity.Usuario;
import br.com.buddybridge.core.usuario.service.UsuarioService;
import br.com.buddybridge.core.util.ExampleExeption;
import jakarta.transaction.SystemException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
@AllArgsConstructor
@RequestMapping("colaborador")
public class ColaboradorController {
    
    private ColaboradorService colaboradorService;

    private UsuarioService usuarioService;
    @GetMapping
    public ResponseEntity<List<Colaborador>> getALlColaboradors(){
        List<Colaborador> Colaboradors = new ArrayList<>(this.colaboradorService.findAll());
        if (Colaboradors.isEmpty()) {
            return new ResponseEntity<>(Colaboradors, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ArrayList<> (Colaboradors), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Colaborador> insertColaborador(@RequestBody ColaboradorDto colaboradorDto){
        try{
            System.out.println("entrei"+colaboradorDto.getNome_colaborador());

            if (colaboradorService.existsByEmail(colaboradorDto.getEmail())) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
            Colaborador colaborador = new Colaborador(colaboradorDto);

            colaborador = this.colaboradorService.saveColaborador(colaborador);
            return new ResponseEntity<>(colaborador, HttpStatus.CREATED);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Colaborador> getColaboradorById(@PathVariable Long id){
        Optional<Colaborador> Colaborador = this.colaboradorService.findColaboradorById(id);
        return Colaborador.map(model -> new ResponseEntity<>(model, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(null,HttpStatus.NOT_FOUND));
    }

    @PutMapping
    public ResponseEntity<Colaborador> updateColaborador(@RequestBody Colaborador Colaborador) throws SystemException, ExampleExeption {
        if(this.colaboradorService.findColaboradorById(Colaborador.getIdcolaborador().longValue()).isPresent()) {
            this.colaboradorService.saveColaborador(Colaborador);
            return new ResponseEntity<>(Colaborador, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteColaborador(@PathVariable Long id){
        if (this.colaboradorService.findColaboradorById(id).isPresent()){
            Optional<Colaborador> optionalColaborador = this.colaboradorService.findColaboradorById(id);

            Colaborador model = optionalColaborador.orElseThrow(() -> new NoSuchElementException("colaborador not found"));

            this.usuarioService.excluir(model.getUsuarioColaborador().getId());

            this.colaboradorService.deleteColaborador(id);

            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
