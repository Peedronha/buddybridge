package br.com.buddybridge.core.adocao.model.get;

import br.com.buddybridge.core.adocao.entity.AdoptionModel;
import br.com.buddybridge.core.adocao.entity.AdoptionProfileModel;
import br.com.buddybridge.core.imageuploader.entity.Image;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;

@Data
public class GetAdoptionDTO {
    private String id_perfil_adocao;
    private String id_adocao;
    private String id_animal;
    private String nome_adotante;
    private String nome_animal;
    private String status_adocao;
    private Integer priority;
    private String idade;
    private String medical_necessities;
    private LocalDateTime data_criacao;

    private String peso_animal;
    private String comprimento_animal;

    private String raca_animal;
    private String tipo_animal;
    private String genero_animal;
    private String localizacao_animal;

    private Boolean alergias;  // Existem crianças ou pessoas com alergias na casa?

    private Boolean animaisAntes;  // Você já teve animais de estimação antes?

    private Integer horasFora;  // Quantas horas por dia você costuma passar fora de casa?

    private Boolean quintalSeguro;  // Você tem um quintal ou área externa segura para o contacaixa brincar?

    private Boolean cuidadosMedicos;  // Está disposto a fornecer cuidados médicos em caso de necessidade?

    private String motivoAdocao;  // Por que você quer adotar este contacaixa em particular?

    private String endereco;

    private String cep;

    private String numero;

    private String complemento;

    private String bairro;

    private String estado;

    private String cidade;

    private String image;




    public GetAdoptionDTO(AdoptionModel model) {
        this.id_perfil_adocao = String.valueOf(model.getProfile().getId_perfil_adocao());
        this.id_adocao = String.valueOf(model.getId_adocao());
        this.id_animal = String.valueOf(model.getProfile().getAnimal().getId_animal());
        this.nome_adotante = model.getAdopter() != null ? model.getAdopter().getNome_adotante() : null;
        this.nome_animal = String.valueOf(model.getProfile().getAnimal().getNome_animal());
        this.status_adocao = String.valueOf(model.getStatus_adocao());

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

    public GetAdoptionDTO(AdoptionProfileModel model) {
        this.id_perfil_adocao = String.valueOf(model.getId_perfil_adocao());
        this.id_adocao = String.valueOf(model.getAdocao().getId_adocao());
        this.id_animal = String.valueOf(model.getAnimal().getId_animal());
        this.nome_animal = String.valueOf(model.getAnimal().getNome_animal());
        this.status_adocao = String.valueOf(model.getAdocao().getStatus_adocao());

        this.peso_animal = String.valueOf(model.getAnimal().getPeso_animal());
        this.comprimento_animal = String.valueOf(model.getAnimal().getComprimento_animal());
        this.genero_animal = String.valueOf(model.getAnimal().getGenero_animal());
        this.localizacao_animal = String.valueOf(model.getAnimal().getLocalizacao_animal());

        this.idade = setIdadeAnimal(model.getAnimal().getData_nascimento());

        this.raca_animal = String.valueOf(model.getAnimal().getRace().getName());
        this.tipo_animal = String.valueOf(model.getAnimal().getRace().getType().getName());
    }

    public String setIdadeAnimal(LocalDate dataNascimento) {
        if ((dataNascimento != null)) {
            Period period = Period.between(dataNascimento, LocalDate.now());
            return period.getYears() +" anos "
                    + period.getMonths() + " meses e "
                    + period.getDays() +" dias";
        }
        return "";
    }
}
