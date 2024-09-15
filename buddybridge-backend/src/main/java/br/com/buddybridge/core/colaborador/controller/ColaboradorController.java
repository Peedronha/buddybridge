package br.com.buddybridge.core.colaborador.controller;

import br.com.buddybridge.core.colaborador.entity.Colaborador;
import br.com.buddybridge.core.colaborador.service.ColaboradorService;
import br.com.buddybridge.core.controleacesso.annotation.LinkAccess;
import br.com.buddybridge.core.usuario.service.UsuarioService;
import br.com.buddybridge.core.util.ExampleExeption;
import jakarta.transaction.SystemException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @LinkAccess(tela= "Cadastro de colaboradores", metodo="POST")
    public ResponseEntity<Colaborador> insertColaborador(@RequestBody Colaborador colaborador){
        try{
            Colaborador toReturn = this.colaboradorService.saveColaborador(colaborador);
            return new ResponseEntity<>(toReturn, HttpStatus.CREATED);
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
    @LinkAccess(tela= "Cadastro de colaboradores", metodo="PUT")
    public ResponseEntity<Colaborador> updateColaborador(@RequestBody Colaborador colaborador) throws SystemException, ExampleExeption {
        Colaborador toReturn  = this.colaboradorService.saveColaborador(colaborador);
        return new ResponseEntity<>(toReturn, HttpStatus.OK);
    }


    @PostMapping("/{id}")
    @LinkAccess(tela= "Cadastro de colaboradores", metodo="DELETE")
    public ResponseEntity<Colaborador> inativarColaborador(@PathVariable Long id)  {
        Optional<Colaborador> optionalColaborador = this.colaboradorService.findColaboradorById(id);
        Colaborador model = optionalColaborador.orElseThrow(() -> new NoSuchElementException("colaborador not found"));
        if(model != null){
            model = this.colaboradorService.inativarColaborador(model);
            return new ResponseEntity<>(model, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteColaborador(@PathVariable Long id){
        System.out.println("entrei");
        if (this.colaboradorService.findColaboradorById(id).isPresent()){
            Optional<Colaborador> optionalColaborador = this.colaboradorService.findColaboradorById(id);
            Colaborador model = optionalColaborador.orElseThrow(() -> new NoSuchElementException("colaborador not found"));
            this.colaboradorService.deleteColaborador(id);
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
