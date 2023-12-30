package com.userlogin.v1.controller;

import com.userlogin.v1.domain.exceptions.UniqueException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.HashSet;
import java.util.Set;

@ControllerAdvice
public class ExceptionsController {

    private Set<String> resposta = new HashSet<>();

    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public ResponseEntity<Set<String>> JdbcSQLIntegrityConstraintViolationException(
            SQLIntegrityConstraintViolationException exception) {
                resposta.add(exception.getMessage());
        return ResponseEntity.badRequest().body(resposta);
    }

    @ExceptionHandler(UniqueException.class)
    public ResponseEntity<Set<String>> UniqueException(UniqueException exception) {
        resposta.add(exception.getMessage());
        return ResponseEntity.badRequest().body(resposta);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Set<String>> RuntimeException(RuntimeException e) {
        resposta.add(e.getMessage());
        return ResponseEntity.badRequest().body(resposta);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Set<String>> Exception(Exception e) {
        resposta.add(e.getMessage());
        return ResponseEntity.badRequest().body(resposta);
    }

}
