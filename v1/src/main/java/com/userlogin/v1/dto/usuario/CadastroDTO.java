package com.userlogin.v1.dto.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.io.Serializable;

public class CadastroDTO implements Serializable {

    @NotBlank(message = "Nome não pode ficar vazio")
    private String nome;

    @NotBlank(message = "CPF não pode ficar vazio")
    @Pattern(regexp = "^(\\d{3}.?\\d{3}.?\\d{3}-?\\d{2})$", message = "CPF inválido")
    private String cpf;

    @NotBlank(message = "Email não pode ficar vazio")
    @Email(message = "Email inválido")
    private String email;

    @Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).{4,8}$",message = "Senha inválida")
    @NotBlank(message = "Senha não pode ficar vazia")
    private String password;
    @Pattern(regexp = "^(\\(\\d{2}\\)?\\s?|\\d{2}(\\-|\\s))?\\d{2,4}(\\-|\\s)?\\d{4,5}$",message = "Telefone inválido")
    @NotBlank(message = "Telefone não pode ficar vazio")
    private String telefone;

    @NotBlank(message = "Data de nascimento não pode ficar vazia")
    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "data invalida")
    private String nascimento;

    public CadastroDTO() {
    }

    public CadastroDTO(String nome, String cpf, String email, String password, String telefone,String nascimento) {
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.password = password;
        this.telefone = telefone;
        this.nascimento = nascimento;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getNascimento() {
        return nascimento;
    }

    public void setNascimento(String nascimento) {
        this.nascimento = nascimento;
    }
}
