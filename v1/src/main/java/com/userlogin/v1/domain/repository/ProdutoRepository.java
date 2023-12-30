package com.userlogin.v1.domain.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.userlogin.v1.domain.entity.Produto;

public interface ProdutoRepository extends JpaRepository<Produto,Integer>{

    Optional<Produto> findByNome(String nome);
    
}
