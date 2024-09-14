package br.com.buddybridge.core.controleacesso.util;

public class AccessDeniedException extends RuntimeException {
    private String tela;
    private String metodo;

    public AccessDeniedException(String tela, String metodo) {
        super("Acesso negado à tela " + tela + " com o método " + metodo);
        this.tela = tela;
        this.metodo = metodo;
    }

    public String getTela() {
        return tela;
    }

    public String getMetodo() {
        return metodo;
    }
}
