package com.userlogin.v1.domain.repository;

import com.userlogin.v1.domain.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {

    Optional<Categoria> getCategoriaByNome(String name);

}
