package br.com.buddybridge.core.adocao.model;

import br.com.buddybridge.core.adocao.entity.AdoptionStatus;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@NoArgsConstructor
@Getter
@Setter
public class AdoptionSubmissionDTO {
    @JsonProperty("id_perfil_adocao")
    private Long idPerfilAdocao;

    @JsonProperty("id_adocao")
    private Long idAdocao;

    @JsonProperty("id_animal")
    private String idAnimal;

    @JsonProperty("nome_adotante")
    private String nomeAdotante;

    @JsonProperty("data_nascimento")
    private String dataNascimento;

    @JsonProperty("CPF")
    private String cpf;

    @JsonProperty("data_criacao")
    private String dataCriacao;

    @JsonProperty("telefone")
    private String telefone;

    @JsonProperty("email")
    private String email;

    @JsonProperty("data_submissao")
    private String dataSubmissao;

    @JsonProperty("endereco")
    private String endereco;

    @JsonProperty("CEP")
    private String cep;

    @JsonProperty("numero")
    private String numero;

    @JsonProperty("Complemento")
    private String complemento;

    @JsonProperty("Bairro")
    private String bairro;

    @JsonProperty("Estado")
    private String estado;

    @JsonProperty("Cidade")
    private String cidade;

    @JsonProperty("alergias")
    private Boolean alergias;

    @JsonProperty("animais_antes")
    private Boolean animaisAntes;

    @JsonProperty("horas_fora")
    private Integer horasFora;

    @JsonProperty("quintal")
    private Boolean quintalSeguro;

    @JsonProperty("cuidados_medicos")
    private Boolean cuidadosMedicos;

    @JsonProperty("motivo_adocao")
    private String motivoAdocao;
}

