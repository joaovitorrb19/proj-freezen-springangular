package com.userlogin.v1.mapper;

import com.userlogin.v1.domain.entity.Usuario;
import com.userlogin.v1.dto.usuario.CadastroDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UsuarioMapper {

    UsuarioMapper INSTANCE = Mappers.getMapper(UsuarioMapper.class);
    Usuario cadastroDTOToUsuario(CadastroDTO cadastroDTO);


}
