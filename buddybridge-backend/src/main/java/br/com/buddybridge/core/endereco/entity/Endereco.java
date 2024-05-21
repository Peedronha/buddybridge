package br.com.buddybridge.core.endereco.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Objects;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Endereco {

    @Column(name = "logradouro_endereco", nullable = true, length = 255)
    private String logradouroEndereco;

    @Column(name = "numero_endereco", nullable = true, length = 45)
    private String numeroEndereco;

    @Column(name = "cidade_endereco", nullable = true, length = 255)
    private String cidadeEndereco;

    @Column(name = "estado_endereco", nullable = true, length = 255)
    private String estadoEndereco;

    @Column(name = "pais_endereco", nullable = true, length = 255)
    private String paisEndereco;

    @Column(name = "cep_endereco", nullable = true, length = 45)
    private String cepEndereco;

    @Column(name = "bairro_endereco", nullable = true, length = 255)
    private String bairroEndereco;

    @Column(name = "complemento_endereco", nullable = true, length = 255)
    private String complemento_endereco;

}
