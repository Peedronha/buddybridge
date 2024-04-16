package br.com.buddybridge.core.util;

public class ExampleExeption extends Exception{

    private String mensagem;
    private String codigo;

    public ExampleExeption(String mensagem, String codigo) {
        this.mensagem = mensagem;
        this.codigo = codigo;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }
}
