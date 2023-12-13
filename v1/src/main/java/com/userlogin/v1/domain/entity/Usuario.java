package com.userlogin.v1.domain.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.io.Serializable;
import java.time.LocalDate;

@Entity
public class Usuario implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nome;
    @Column(unique = true)
    private String cpf;
    @Column(unique = true)
    private String email;

    private String password;

    private String telefone;

    private LocalDate nascimento;
}
