package br.com.buddybridge.core.Employee.service;

import br.com.buddybridge.core.Employee.entity.EmployeeModel;
import br.com.buddybridge.core.Employee.repository.EmployeeRepository;
import br.com.buddybridge.core.usuario.entity.Usuario;
import br.com.buddybridge.core.usuario.repository.UsuarioRepository;
import br.com.buddybridge.core.usuario.service.UsuarioService;
import br.com.buddybridge.core.util.ExampleExeption;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.transaction.SystemException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static br.com.buddybridge.core.security.config.PasswordGenerator.generatePassword;

@Service
@AllArgsConstructor
public class EmployeeService {
    private EmployeeRepository employeeRepository;
    private UsuarioRepository usuarioRepository;

    private UsuarioService usuarioService;

    @Transactional(readOnly = true)
    public List<EmployeeModel> findAll() {
        return employeeRepository.findAll();
    }


    public EmployeeModel saveEmployeeModel(EmployeeModel employeeModel) throws SystemException, ExampleExeption {
        try {
            EmployeeModel voluntario = employeeRepository.save(employeeModel);

            this.usuarioService.salvar(gerarUsuario(voluntario), true);

            return voluntario;
        } catch (Exception e) {
            throw new SystemException(String.valueOf(e));
        }
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

    public Usuario gerarUsuario(EmployeeModel volunteer){
        Usuario u = new Usuario(volunteer);
        u.setSenha(generatePassword(8));
        u.setTelefone("");

        return u;
    }
}
