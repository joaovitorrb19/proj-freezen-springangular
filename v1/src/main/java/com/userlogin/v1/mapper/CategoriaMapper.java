package com.userlogin.v1.mapper;

import com.userlogin.v1.domain.entity.Categoria;
import com.userlogin.v1.dto.categoria.CategoriaUpdateDTO;
import com.userlogin.v1.dto.categoria.PostCategoriaDTO;
import com.userlogin.v1.dto.categoria.ViewModelCategoriaDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface CategoriaMapper {
    CategoriaMapper INSTANCE = Mappers.getMapper(CategoriaMapper.class);

    Categoria dtoToCategoria(PostCategoriaDTO postCategoriaDTO);

    ViewModelCategoriaDTO categoriaToViewModelDTO(Categoria categoria);

    Categoria viewModelToCategoria(ViewModelCategoriaDTO viewModelCategoriaDTO);

    Categoria categoriaUpdateToCategoria(CategoriaUpdateDTO categoriaUpdateDTO);

    List<ViewModelCategoriaDTO> categoriasToListDto(List<Categoria> categoriaList);
}
