package br.com.buddybridge.core.ong.entity;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "ong")
public class Ong {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idong")
    private Long idOng;

    @Column(name = "razao_social_ong", nullable = false, length = 255)
    private String razaoSocialOng;

    @Column(name = "cnpj_ong", nullable = false, length = 14)
    private String cnpjOng;

    @Column(name = "missao_ong")
    private String missaoOng;

    @Column(name = "varores_ong")
    private String varoresOng;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Ong ong = (Ong) o;
        return Objects.equals(idOng, ong.idOng);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idOng);
    }

    public Long getIdOng() {
        return idOng;
    }

    public void setIdOng(Long idOng) {
        this.idOng = idOng;
    }

    public String getRazaoSocialOng() {
        return razaoSocialOng;
    }

    public void setRazaoSocialOng(String razaoSocialOng) {
        this.razaoSocialOng = razaoSocialOng;
    }

    public String getCnpjOng() {
        return cnpjOng;
    }

    public void setCnpjOng(String cnpjOng) {
        this.cnpjOng = cnpjOng;
    }

    public String getMissaoOng() {
        return missaoOng;
    }

    public void setMissaoOng(String missaoOng) {
        this.missaoOng = missaoOng;
    }

    public String getVaroresOng() {
        return varoresOng;
    }

    public void setVaroresOng(String varoresOng) {
        this.varoresOng = varoresOng;
    }

    public String getVisaoOng() {
        return visaoOng;
    }

    public void setVisaoOng(String visaoOng) {
        this.visaoOng = visaoOng;
    }

    public String getTelefoneOng() {
        return telefoneOng;
    }

    public void setTelefoneOng(String telefoneOng) {
        this.telefoneOng = telefoneOng;
    }

    public String getWhatsappOng() {
        return whatsappOng;
    }

    public void setWhatsappOng(String whatsappOng) {
        this.whatsappOng = whatsappOng;
    }

    public String getEmailFinanceiroOng() {
        return emailFinanceiroOng;
    }

    public void setEmailFinanceiroOng(String emailFinanceiroOng) {
        this.emailFinanceiroOng = emailFinanceiroOng;
    }

    public String getEmailContatoOng() {
        return emailContatoOng;
    }

    public void setEmailContatoOng(String emailContatoOng) {
        this.emailContatoOng = emailContatoOng;
    }

    public String getHistoriaOng() {
        return historiaOng;
    }

    public void setHistoriaOng(String historiaOng) {
        this.historiaOng = historiaOng;
    }

    public String getInstagramOng() {
        return instagramOng;
    }

    public void setInstagramOng(String instagramOng) {
        this.instagramOng = instagramOng;
    }

    public String getFacebookOng() {
        return facebookOng;
    }

    public void setFacebookOng(String facebookOng) {
        this.facebookOng = facebookOng;
    }

    public String getTwitterOng() {
        return twitterOng;
    }

    public void setTwitterOng(String twitterOng) {
        this.twitterOng = twitterOng;
    }

    public String getLinkedinOng() {
        return linkedinOng;
    }

    public void setLinkedinOng(String linkedinOng) {
        this.linkedinOng = linkedinOng;
    }
}

