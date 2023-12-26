package com.userlogin.v1.controller;

import com.userlogin.v1.domain.exceptions.UniqueException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.sql.SQLIntegrityConstraintViolationException;

@ControllerAdvice
public class ExceptionsController {

    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public ResponseEntity JdbcSQLIntegrityConstraintViolationException(SQLIntegrityConstraintViolationException exception){
        return ResponseEntity.badRequest().body(exception.getMessage());
    }
    @ExceptionHandler(UniqueException.class)
    public ResponseEntity UniqueException(UniqueException exception){
        return ResponseEntity.badRequest().body(exception.getMessage());
    }
}
