package br.com.buddybridge.core.Employee.service;

import br.com.buddybridge.core.Employee.entity.EmployeeModel;
import br.com.buddybridge.core.Employee.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class EmployeeService {
    private EmployeeRepository employeeRepository;

    @Transactional(readOnly = true)
    public List<EmployeeModel> findAll() {
        return employeeRepository.findAll();
    }
    @Transactional
    public void saveEmployeeModel(EmployeeModel employeeModel) {
        employeeRepository.save(employeeModel);
    }
    @Transactional
    public Optional<EmployeeModel> findEmployeeModelById(Long id) {
        return employeeRepository.findById(id);
    }
    @Transactional
    public void deleteEmployeeModel(Long id) {
        employeeRepository.deleteById(id);
    }

    public boolean existsByEmail(String emailVoluntario) {
        return employeeRepository.existsByEmail(emailVoluntario);
    }
}
