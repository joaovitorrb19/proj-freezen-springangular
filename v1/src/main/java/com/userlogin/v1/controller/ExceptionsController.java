package com.userlogin.v1.controller;

import com.userlogin.v1.domain.exceptions.UniqueException;

import jakarta.persistence.EntityExistsException;
import jakarta.validation.ConstraintViolationException;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@ControllerAdvice
public class ExceptionsController {

    private List<String> resposta = new ArrayList<>();

    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public ResponseEntity<List<String>> JdbcSQLIntegrityConstraintViolationException(
            SQLIntegrityConstraintViolationException exception) {
                resposta.add(exception.getMessage());
        return ResponseEntity.badRequest().body(resposta);
    }

    @ExceptionHandler(UniqueException.class)
    public ResponseEntity<List<String>> UniqueException(UniqueException exception) {
        resposta.add(exception.getMessage().toString());
        return ResponseEntity.badRequest().body(resposta);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<List<String>> RuntimeException(RuntimeException e) {
        resposta.add(e.getMessage());
        return ResponseEntity.badRequest().body(resposta);
    }

    @ExceptionHandler(EntityExistsException.class)
    public ResponseEntity<List<String>> EntityExistsException(EntityExistsException e) {
        resposta.add(e.getMessage());
        return ResponseEntity.badRequest().body(resposta);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<List<String>> Exception(Exception e) {
        resposta.add(e.getMessage());
        return ResponseEntity.badRequest().body(resposta);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<List<String>> ConstraintViolationException(ConstraintViolationException e){
        resposta.add(e.getMessage());
        return ResponseEntity.badRequest().body(resposta);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<List<String>> BadCredentialsException(BadCredentialsException e){
        resposta.add(e.getMessage());
        return ResponseEntity.badRequest().body(resposta);
    }

}
