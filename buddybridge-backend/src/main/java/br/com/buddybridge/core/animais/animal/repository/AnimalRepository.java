package br.com.buddybridge.core.animais.animal.repository;

import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface AnimalRepository extends JpaRepository<AnimalModel, Long> {

    // Contar adoções concluídas através de AdoptionProfileModel e AdoptionModel
    @Query("SELECT COUNT(a) FROM AnimalModel a JOIN a.profiles p JOIN p.adocao ad WHERE ad.status_adocao = 'COMPLETED'")
    long countAnimalsWithCompletedAdoption();

    // Contar adoções em andamento (status diferente de 'COMPLETED' e 'PENDING')
    @Query("SELECT COUNT(a) FROM AnimalModel a JOIN a.profiles p JOIN p.adocao ad WHERE ad.status_adocao NOT IN ('COMPLETED', 'PENDING')")
    long countAnimalsWithAdoptionInProgress();

    // Contar animais aguardando adoção (status 'PENDING')
    @Query("SELECT COUNT(a) FROM AnimalModel a JOIN a.profiles p JOIN p.adocao ad WHERE ad.status_adocao = 'PENDING'")
    long countAnimalsAwaitingAdoption();

    // Contar animais sem perfil de adoção
    @Query("SELECT COUNT(a) FROM AnimalModel a WHERE a.profiles IS EMPTY")
    long countAnimalsWithoutAdoptionProfile();

    // Listar animais aguardando análise de adoção (status 'ANALYSING')
    @Query("SELECT a FROM AnimalModel a JOIN a.profiles p JOIN p.adocao ad WHERE ad.status_adocao = 'ANALYSING'")
    List<AnimalModel> findAnimalsAwaitingAnalysis();

    // Contar animais resgatados por mês no ano especificado
    @Query("SELECT MONTH(a.data_resgate) AS mes, COUNT(a) AS totalResgatados " +
            "FROM AnimalModel a " +
            "WHERE YEAR(a.data_resgate) = :year " +
            "GROUP BY MONTH(a.data_resgate)")
    List<Object[]> countRescuedAnimalsByMonthAndYear(@Param("year") int year);

    // Contar animais doados (adoções concluídas) por mês no ano especificado
    @Query("SELECT MONTH(ad.data_submissao) AS mes, COUNT(ad) AS totalAdotados " +
            "FROM AnimalModel a JOIN a.profiles p JOIN p.adocao ad " +
            "WHERE ad.status_adocao = 'COMPLETED' AND YEAR(ad.data_submissao) = :year " +
            "GROUP BY MONTH(ad.data_submissao)")
    List<Object[]> countAdoptedAnimalsByMonthAndYear(@Param("year") int year);


    // Contar animais por status de adoção
    @Query("SELECT ad.status_adocao, COUNT(a) FROM AnimalModel a " +
            "JOIN a.profiles p JOIN p.adocao ad GROUP BY ad.status_adocao")
    List<Object[]> countAnimalsByAdoptionStatus();

    // Contar animais por raça
    @Query("SELECT r.name, COUNT(a) FROM AnimalModel a " +
            "JOIN a.race r GROUP BY r.name")
    List<Object[]> countAnimalsByRace();

}

