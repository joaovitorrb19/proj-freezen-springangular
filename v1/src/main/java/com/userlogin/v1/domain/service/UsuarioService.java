package com.userlogin.v1.domain.service;

import com.userlogin.v1.domain.repository.UsuarioRepository;
import com.userlogin.v1.dto.CadastroDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public void Cadastro(CadastroDTO cadastroDTO){

    }

}
