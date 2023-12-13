package com.userlogin.v1.controller;

import com.userlogin.v1.dto.CadastroDTO;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("usuario")
public class UsuarioController {

    ValidatorFactory factory = Validation.buildDefaultValidatorFactory();

    Validator validator = this.factory.getValidator();

    @PostMapping("cadastro")
    public ResponseEntity Cadstro(@RequestBody CadastroDTO cadastroDto){

        Set<ConstraintViolation<CadastroDTO>> validate = validator.validate(cadastroDto);

        if(!validate.isEmpty())
            return ResponseEntity.badRequest().body(validate.stream().map(x -> x.getMessage()));

        return ResponseEntity.ok("Cadastro feito com sucesso");
    }

}
