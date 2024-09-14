package br.com.buddybridge.core.controleacesso.controller;

import br.com.buddybridge.core.controleacesso.entity.Acesso;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class AccessLoader {
    public List<Acesso> carregarAcessosDeArquivo(String filePath) throws IOException {
        List<Acesso> acessos = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                // Ignora linhas em branco ou apenas com espaços
                if (line.trim().isEmpty()) {
                    continue;
                }

                String[] parts = line.split(";");

                // Verifica se a linha contém exatamente 4 partes
                if (parts.length == 4) {
                    String modulo = parts[0].trim();
                    String telaAcesso = parts[1].trim();
                    String tipo = parts[2].trim();
                    String descricao = parts[3].trim();

                    // Cria e configura o objeto Acesso
                    Acesso acesso = new Acesso();
                    acesso.setModuloAcesso(modulo);
                    acesso.setTelaAcesso(telaAcesso);
                    acesso.setTipoAcesso(tipo);
                    acesso.setDescricaoAcesso(descricao);

                    // Adiciona o objeto à lista
                    acessos.add(acesso);
                } else if (parts.length == 6) {
                    String modulo = parts[0].trim();
                    String telaAcesso = parts[1].trim();
                    String tipo = parts[2].trim();
                    String descricao = parts[3].trim();
                    String icone = parts[4].trim();
                    String url = parts[5].trim();
                    // Cria e configura o objeto Acesso
                    Acesso acesso = new Acesso();
                    acesso.setModuloAcesso(modulo);
                    acesso.setTelaAcesso(telaAcesso);
                    acesso.setTipoAcesso(tipo);
                    acesso.setDescricaoAcesso(descricao);
                    acesso.setIconeAcesso(icone);
                    acesso.setUrlAcesso(url);
                    // Adiciona o objeto à lista
                    acessos.add(acesso);

                } else {
                    System.err.println("Linha com formato incorreto: " + line);
                }
            }
        }

        return acessos;
    }
}
