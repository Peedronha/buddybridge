package br.com.buddybridge.core.Employee.repository;

import br.com.buddybridge.core.Employee.entity.EmployeeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeModel, Long> {

    boolean existsByEmail(String emailVoluntario);
}
