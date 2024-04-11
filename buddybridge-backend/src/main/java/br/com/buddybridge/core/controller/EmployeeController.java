package br.com.buddybridge.core.controller;

import br.com.buddybridge.core.model.EmployeeModel;
import br.com.buddybridge.core.model.EmployeeModel;
import br.com.buddybridge.core.model.dto.VolunteerDto;
import br.com.buddybridge.core.service.EmployeeService;
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
                this.employeeService.saveEmployeeModel(new EmployeeModel(volunteerDto));
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
    public ResponseEntity<EmployeeModel> updateEmployeeModel(@RequestAttribute Long id,@RequestBody EmployeeModel EmployeeModel){
        if(this.employeeService.findEmployeeModelById(id).isPresent()) {
            this.employeeService.saveEmployeeModel(EmployeeModel);
            return new ResponseEntity<>(EmployeeModel, HttpStatus.OK);
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
}
