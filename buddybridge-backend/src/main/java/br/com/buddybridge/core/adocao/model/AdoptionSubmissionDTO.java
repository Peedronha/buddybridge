package br.com.buddybridge.core.adocao.model;

import br.com.buddybridge.core.adocao.entity.AdoptionStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AdoptionSubmissionDTO {

//    private Long id_adocao;
//    private Long id_animal;
//    private Long id_adotante;
//    private LocalDateTime data_submissao;
//    private AddressDTO address;
//    private AdoptionStatus status_adocao;
//    private Integer priority;
//    private String medical_necessities;
//    private String image;
//    private LocalDateTime data_criacao;
    private Long id_perfil_adocao;
    private Long id_adocao;
    private String id_animal;
    private String nome_adotante;
    private String data_nascimento;
    private String CPF;
    private String idade;
    private String data_criacao;
    private String telefone;
    private String email;
    private String data_submissao;
    private String endereco;
    private String CEP;
    private String numero;
    private String complemento;
    private String bairro;
    private String estado;
    private String cidade;
}
