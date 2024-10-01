package br.com.buddybridge.core.animais.animal.repository;

import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalRepository extends JpaRepository<AnimalModel, Long> {
    @Query("SELECT a FROM AnimalModel a WHERE "
            + "(:species IS NULL OR a.race.type = :species) AND "
            + "(:breed IS NULL OR a.race = :breed) AND "
            + "(:minAge IS NULL OR TIMESTAMPDIFF(YEAR, a.data_nascimento, CURRENT_DATE) >= :minAge) AND "
            + "(:maxAge IS NULL OR TIMESTAMPDIFF(YEAR, a.data_nascimento, CURRENT_DATE) <= :maxAge)")
    List<AnimalModel> filterAnimals(@Param("species") String species,
                                    @Param("breed") String breed,
                                    @Param("minAge") Integer minAge,
                                    @Param("maxAge") Integer maxAge);
}
