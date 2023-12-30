package com.userlogin.v1.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.userlogin.v1.domain.entity.Produto;
import com.userlogin.v1.dto.produto.ProdutoEntradaDTO;

@Mapper
public interface ProdutoMapper {
    
    ProdutoMapper INSTANCE = Mappers.getMapper(ProdutoMapper.class);

    Produto produtoDtoToProduto(ProdutoEntradaDTO produtoEntradaDTO);

}
