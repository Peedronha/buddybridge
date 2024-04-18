package br.com.buddybridge.core.Employee.controller;

import static br.com.buddybridge.core.security.config.PasswordGenerator.generatePassword;
import br.com.buddybridge.core.Employee.entity.EmployeeModel;
import br.com.buddybridge.core.Employee.model.VolunteerDto;
import br.com.buddybridge.core.Employee.service.EmployeeService;
import br.com.buddybridge.core.usuario.entity.Usuario;
import br.com.buddybridge.core.usuario.service.UsuarioService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;



@RestController
@AllArgsConstructor
@RequestMapping("volunteer")
public class EmployeeController {
    
    private EmployeeService employeeService;

    private UsuarioService usuarioService;
    @GetMapping
    public ResponseEntity<List<EmployeeModel>> getALlEmployeeModels(){
        List<EmployeeModel> employeeModels = new ArrayList<>(this.employeeService.findAll());
        if (employeeModels.isEmpty()) {
            return new ResponseEntity<>(employeeModels, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ArrayList<> (employeeModels), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<EmployeeModel> insertEmployeeModel(@RequestBody VolunteerDto volunteerDto){
        try{

            if (!employeeService.existsByEmail(volunteerDto.getEmail())) {
                EmployeeModel voluntario = this.employeeService.saveEmployeeModel(new EmployeeModel(volunteerDto));
                Usuario u = gerarUsuario(volunteerDto);
                u.setUsuarioIdvoluntario(voluntario);
                this.usuarioService.salvar(u);
            }
            return new ResponseEntity<>(new EmployeeModel(volunteerDto), HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeModel> getEmployeeModelById(@PathVariable Long id){
        Optional<EmployeeModel> employeeModel = this.employeeService.findEmployeeModelById(id);
        return employeeModel.map(model -> new ResponseEntity<>(model, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(null,HttpStatus.NOT_FOUND));
    }

    @PutMapping
    public ResponseEntity<EmployeeModel> updateEmployeeModel(@RequestBody EmployeeModel employeeModel){
        if(this.employeeService.findEmployeeModelById(employeeModel.getIdvoluntario().longValue()).isPresent()) {
            this.employeeService.saveEmployeeModel(employeeModel);
            return new ResponseEntity<>(employeeModel, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteEmployeeModel(@PathVariable Long id){
        if (this.employeeService.findEmployeeModelById(id).isPresent()){
            this.employeeService.deleteEmployeeModel(id);
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    public Usuario gerarUsuario(VolunteerDto volunteerDto){
        Usuario u = new Usuario();
        u.setNome(volunteerDto.getNome_voluntario());
        u.setLogin(volunteerDto.getEmail());
        u.setSenha(generatePassword(8));

        return u;
    }
}
