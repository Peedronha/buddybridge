package br.com.buddybridge.core.adocao.model.get;

import br.com.buddybridge.core.adocao.entity.AdoptionModel;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class GetAdoptionDetails {
    private Long id_adocao;
    private String nome_adotante;
    private String nome_animal;
    private String status_adocao;
    private String email;
    private String telefone;
    private String endereco;
    private String numero;

    @JsonProperty("CEP")
    private String cep;

    @JsonProperty("Complemento")
    private String complemento;

    @JsonProperty("Bairro")
    private String bairro;

    @JsonProperty("Estado")
    private String estado;

    @JsonProperty("Cidade")
    private String cidade;

    // Questionnaire details
    private Boolean alergias;
    private Boolean animaisAntes;
    private Integer horasFora;
    private Boolean quintalSeguro;
    private Boolean cuidadosMedicos;
    private String motivoAdocao;

    public GetAdoptionDetails(AdoptionModel model){
        this.id_adocao = model.getId_adocao();
        this.nome_adotante = model.getAdopter() != null ? model.getAdopter().getNome_adotante() : null;
        this.nome_animal = String.valueOf(model.getProfile().getAnimal().getNome_animal());
        this.status_adocao = String.valueOf(model.getStatus_adocao());
        this.email = model.getAdopter() != null ? model.getAdopter().getEmail() : null;
        this.telefone = String.valueOf(model.getAdopter().getTelefone());

        this.alergias =model.getAdopter() != null ? model.getAdopter().getAlergias() : null;
        this.animaisAntes =model.getAdopter() != null ? model.getAdopter().getAnimaisAntes() : null;
        this.horasFora =model.getAdopter() != null ? model.getAdopter().getHorasFora() : null;
        this.quintalSeguro =model.getAdopter() != null ? model.getAdopter().getQuintalSeguro() : null;
        this.cuidadosMedicos =model.getAdopter() != null ? model.getAdopter().getCuidadosMedicos() : null;
        this.motivoAdocao =model.getAdopter() != null ? model.getAdopter().getMotivoAdocao() : null;

        this.endereco = model.getAdopter().getAddress() != null ? model.getAdopter().getAddress().getEndereco() : null;
        this.cep = model.getAdopter().getAddress() != null ? model.getAdopter().getAddress().getCep() : null;
        this.numero = model.getAdopter().getAddress() != null ? model.getAdopter().getAddress().getNumero() : null;
        this.complemento = model.getAdopter().getAddress() != null ? model.getAdopter().getAddress().getComplemento() : null;
        this.bairro = model.getAdopter().getAddress() != null ? model.getAdopter().getAddress().getBairro() : null;
        this.estado = model.getAdopter().getAddress() != null ? model.getAdopter().getAddress().getEstado() : null;
        this.cidade = model.getAdopter().getAddress() != null ? model.getAdopter().getAddress().getCidade() : null;
    }
}
