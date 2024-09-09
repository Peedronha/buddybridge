package br.com.buddybridge.core.adocao.entity;

import br.com.buddybridge.core.adocao.model.AddressDTO;
import br.com.buddybridge.core.adocao.model.AdoptionSubmissionDTO;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
public class AddressModel {

    @NotBlank
    @Column(name = "endereco")
    private String endereco;

    @NotBlank
    @Pattern(regexp = "^\\d{5}-?\\d{3}$", message = "CEP must be in the format 00000-000")
    @Column(name = "cep")
    private String cep;

    @NotBlank
    @Column(name = "numero")
    private String numero;

    @Column(name = "complemento")
    private String complemento;

    @NotBlank
    @Column(name = "bairro")
    private String bairro;

    @NotBlank
    @Column(name = "estado")
    private String estado;

    @NotBlank
    @Column(name = "cidade")
    private String cidade;

    public AddressModel(AddressDTO addressDTO) {
        this.endereco = addressDTO.getEndereco();
        this.cep = addressDTO.getCep();
        this.numero = addressDTO.getNumero();
        this.complemento = addressDTO.getComplemento();
        this.bairro = addressDTO.getBairro();
        this.estado = addressDTO.getEstado();
        this.cidade = addressDTO.getCidade();
    }

}
