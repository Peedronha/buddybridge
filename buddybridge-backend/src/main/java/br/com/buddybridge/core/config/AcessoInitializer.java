package br.com.buddybridge.core.config;

import br.com.buddybridge.core.controleacesso.service.GrupoAcessoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

@Component
public class AcessoInitializer implements CommandLineRunner {

    @Autowired
    private GrupoAcessoService acessoService;

    @Override
    public void run(String... args) throws Exception {

        System.out.println("Carregando acessos do BUDDY MENU");
        String filePathMenu = new ClassPathResource("acessos/acessoMenu.txt").getFile().getAbsolutePath();
        acessoService.carregarEAdicionarAcessos(filePathMenu);
        System.out.println("Acessos carregados e adicionados ao banco de dados do BUDDY MENU.");

        System.out.println("Carregando acessos do BUDDY BASE");
        String filePathBase = new ClassPathResource("acessos/acessoBase.txt").getFile().getAbsolutePath();
        acessoService.carregarEAdicionarAcessos(filePathBase);
        System.out.println("Acessos carregados e adicionados ao banco de dados do BUDDY BASE.");

        System.out.println("Carregando acessos do BUDDY ANIMAIS");
        String filePathAnimais = new ClassPathResource("acessos/acessoAnimais.txt").getFile().getAbsolutePath();
        acessoService.carregarEAdicionarAcessos(filePathAnimais);
        System.out.println("Acessos carregados e adicionados ao banco de dados do BUDDY ANIMAIS.");

        System.out.println("Carregando acessos do BUDDY FINANCEIRO");
        String filePathFinanceiro = new ClassPathResource("acessos/acessoFinanceiro.txt").getFile().getAbsolutePath();
        acessoService.carregarEAdicionarAcessos(filePathFinanceiro);
        System.out.println("Acessos carregados e adicionados ao banco de dados do BUDDY FINANCEIRO.");


    }
}
