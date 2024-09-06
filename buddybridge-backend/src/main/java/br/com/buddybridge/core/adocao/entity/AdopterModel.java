package br.com.buddybridge.core.adocao.entity;

import br.com.buddybridge.core.adocao.model.AdoptionSubmissionDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "adotantes")
public class AdopterModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_adotante")
    private Long id_adotante;

    @NotBlank
    @Column(name = "nome_adotante")
    private String nome_adotante;

    @NotBlank
    @Column(name = "data_nascimento")
    private LocalDate data_nascimento;

    @NotBlank
    @Pattern(regexp = "^\\d{11}$", message = "CPF must be 11 digits")
    @Column(name = "cpf")
    private String cpf;

    @NotBlank
    @Column(name = "telefone")
    private String telefone;

    @NotBlank
    @Email
    @Column(name = "email")
    private String email;

    @OneToMany(mappedBy = "adopter")
    private List<AdoptionModel> adoptions;

    public AdopterModel(AdoptionSubmissionDTO adoptionDTO) {
        this.nome_adotante = adoptionDTO.getNome_adotante();
        this.data_nascimento = LocalDate.parse(adoptionDTO.getData_nascimento());
        this.cpf = adoptionDTO.getCPF();
        this.telefone = adoptionDTO.getTelefone();
        this.email = adoptionDTO.getEmail();
    }
}
