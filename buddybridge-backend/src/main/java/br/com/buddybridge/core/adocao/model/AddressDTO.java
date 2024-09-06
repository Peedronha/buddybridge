package br.com.buddybridge.core.adocao.model;

import lombok.Data;

@Data
public class AddressDTO {
    private String endereco;
    private String cep;
    private String numero;
    private String complemento;
    private String bairro;
    private String estado;
    private String cidade;

    public AddressDTO(AdoptionSubmissionDTO dto) {
        this.endereco = dto.getEndereco();
        this.cep = dto.getCEP();
        this.numero = dto.getNumero();
        this.complemento = dto.getComplemento();
        this.bairro = dto.getBairro();
        this.estado = dto.getEstado();
        this.cidade = dto.getCidade();
    }
}
