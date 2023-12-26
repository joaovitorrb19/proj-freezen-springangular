package com.userlogin.v1.controller;

import com.userlogin.v1.domain.entity.Usuario;
import com.userlogin.v1.domain.service.UsuarioService;
import com.userlogin.v1.dto.usuario.CadastroDTO;
import com.userlogin.v1.dto.usuario.LoginDTO;
import com.userlogin.v1.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("usuario")
public class UsuarioController {


    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("cadastro")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Set<String>> Cadastro(@RequestBody CadastroDTO cadastroDto){

        Set<String> cadastro = this.usuarioService.Cadastro(cadastroDto);

        return ResponseEntity.ok(cadastro);
    }

    @PostMapping("login")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity Login(@RequestBody LoginDTO loginDTO){

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword());

        try {
            Authentication authenticate = this.authenticationManager.authenticate(authenticationToken) ;
            return ResponseEntity.ok().body(TokenService.gerarToken(loginDTO.getEmail()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Credenciais inválidas");
        }

    }

    @GetMapping("getall")
    @Secured("ADMIN")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<List<Usuario>> GetAll(){

        List<Usuario> usuarios = this.usuarioService.GetAll();

        return ResponseEntity.ok(usuarios);

    }

}
