package br.com.buddybridge.core.acesso;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "acessoobjeto")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AcessoObjeto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

}
