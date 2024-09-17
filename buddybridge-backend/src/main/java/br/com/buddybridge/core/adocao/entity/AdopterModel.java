package br.com.buddybridge.core.adocao.entity;

import br.com.buddybridge.core.adocao.model.AdoptionSubmissionDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    @OneToOne
    @JoinColumn(name = "id_adocao")
    private AdoptionModel adocao;

    @NotNull
    @Column(name = "alergias")
    private Boolean alergias;  // Existem crianças ou pessoas com alergias na casa?

    @NotNull
    @Column(name = "animais_antes")
    private Boolean animaisAntes;  // Você já teve animais de estimação antes?

    @NotNull
    @Column(name = "horas_fora")
    private Integer horasFora;  // Quantas horas por dia você costuma passar fora de casa?

    @NotNull
    @Column(name = "quintal_seguro")
    private Boolean quintalSeguro;  // Você tem um quintal ou área externa segura para o animal brincar?

    @NotNull
    @Column(name = "cuidados_medicos")
    private Boolean cuidadosMedicos;  // Está disposto a fornecer cuidados médicos em caso de necessidade?

    @Column(name = "motivo_adocao", length = 500)
    private String motivoAdocao;  // Por que você quer adotar este animal em particular?

    @Embedded
    private AddressModel address;

    public AdopterModel(AdoptionSubmissionDTO adoptionDTO) {
        this.nome_adotante = adoptionDTO.getNomeAdotante();
        this.data_nascimento = LocalDate.parse(adoptionDTO.getDataNascimento());
        this.cpf = adoptionDTO.getCpf();
        this.telefone = adoptionDTO.getTelefone();
        this.email = adoptionDTO.getEmail();
        this.alergias = adoptionDTO.getAlergias();
        this.animaisAntes = adoptionDTO.getAnimaisAntes();
        this.horasFora = adoptionDTO.getHorasFora();
        this.quintalSeguro = adoptionDTO.getQuintalSeguro();
        this.cuidadosMedicos = adoptionDTO.getCuidadosMedicos();
        this.motivoAdocao = adoptionDTO.getMotivoAdocao();
    }
}
