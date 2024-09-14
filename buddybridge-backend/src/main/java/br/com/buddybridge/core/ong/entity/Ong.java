package br.com.buddybridge.core.ong.entity;

import br.com.buddybridge.core.controleacesso.entity.GrupoAcesso;
import br.com.buddybridge.core.endereco.entity.Endereco;
import br.com.buddybridge.core.usuario.entity.Usuario;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Entity
@Table(name = "ong")
@Getter
@Setter
@EqualsAndHashCode
public class Ong {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idong")
    private Long idOng;

    @Column(name = "razao_social_ong", nullable = false, length = 255)
    private String razaoSocialOng;

    @Column(name = "cnpj_ong", nullable = false, length = 35)
    private String cnpjOng;

    @Column(name = "missao_ong")
    private String missaoOng;

    @Column(name = "valores_ong")
    private String valoresOng;

    @Column(name = "visaoOng")
    private String visaoOng;

    @Column(name = "telefone_ong", nullable = false, length = 45)
    private String telefoneOng;

    @Column(name = "whatsapp_ong", nullable = false, length = 45)
    private String whatsappOng;

    @Column(name = "email_financeiro_ong", nullable = false, length = 255)
    private String emailFinanceiroOng;

    @Column(name = "email_contato_ong", nullable = false, length = 255)
    private String emailContatoOng;

    @Column(name = "historia_ong")
    private String historiaOng;

    @Column(name = "instagram_ong", length = 255)
    private String instagramOng;

    @Column(name = "facebook_ong", length = 255)
    private String facebookOng;

    @Column(name = "twitter_ong", length = 255)
    private String twitterOng;

    @Column(name = "linkedin_ong", length = 255)
    private String linkedinOng;

    @ManyToOne
    @JoinColumn(name="usuario_id", referencedColumnName="id")
    private Usuario usuarioOng;

    @ManyToOne
    @JoinColumn(name="grupoacesso_adotante_id", referencedColumnName="idgrupoAcesso")
    private GrupoAcesso grupoAcessoAdotante;

    @ManyToOne
    @JoinColumn(name="grupoacesso_Colaborador_id", referencedColumnName="idgrupoAcesso")
    private GrupoAcesso grupoAcessoColaborador;

    @Embedded
    private Endereco ongEndereco;


}

