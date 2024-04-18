package br.com.buddybridge.core.Employee.controller;

import static br.com.buddybridge.core.security.config.PasswordGenerator.generatePassword;
import br.com.buddybridge.core.Employee.entity.EmployeeModel;
import br.com.buddybridge.core.Employee.model.VolunteerDto;
import br.com.buddybridge.core.Employee.service.EmployeeService;
import br.com.buddybridge.core.usuario.entity.Usuario;
import br.com.buddybridge.core.usuario.service.UsuarioService;
import br.com.buddybridge.core.util.ExampleExeption;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.SystemException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.*;


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
            EmployeeModel voluntario = new EmployeeModel();
            if (!employeeService.existsByEmail(volunteerDto.getEmail())) {
                 voluntario = this.employeeService.saveEmployeeModel(new EmployeeModel(volunteerDto));
            }
            return new ResponseEntity<>(voluntario, HttpStatus.CREATED);
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
    public ResponseEntity<EmployeeModel> updateEmployeeModel(@RequestBody EmployeeModel employeeModel) throws SystemException, ExampleExeption {
        if(this.employeeService.findEmployeeModelById(employeeModel.getIdvoluntario().longValue()).isPresent()) {
            this.employeeService.saveEmployeeModel(employeeModel);
            return new ResponseEntity<>(employeeModel, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteEmployeeModel(@PathVariable Long id){
        if (this.employeeService.findEmployeeModelById(id).isPresent()){
            Optional<EmployeeModel> optionalEmployeeModel = this.employeeService.findEmployeeModelById(id);

            EmployeeModel model = optionalEmployeeModel.orElseThrow(() -> new NoSuchElementException("Voluntario not found"));

            Usuario u = this.usuarioService.buscarPorUsuario_idvoluntario(model);

            this.usuarioService.excluir(u.getId());

            this.employeeService.deleteEmployeeModel(id);

            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
