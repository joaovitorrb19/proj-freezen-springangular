package com.userlogin.v1.domain.service;

import com.userlogin.v1.domain.entity.Role;
import com.userlogin.v1.domain.entity.Usuario;
import com.userlogin.v1.domain.exceptions.UniqueException;
import com.userlogin.v1.domain.repository.RoleRepository;
import com.userlogin.v1.domain.repository.UsuarioRepository;
import com.userlogin.v1.dto.usuario.CadastroDTO;
import com.userlogin.v1.mapper.UsuarioMapper;
import jakarta.validation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UsuarioService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RoleRepository roleRepository;

    ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    Validator validator = this.factory.getValidator();

    public Set<String> Cadastro(CadastroDTO cadastroDTO){

        if(this.roleRepository.findAll().size() == 0){
                Role roleADM = new Role("ADMIN");
                this.roleRepository.save(roleADM);
                Role roleUSER = new Role("USER");
                this.roleRepository.save(roleUSER);
        }

        Set<String> errors = new HashSet<>();

        Set<ConstraintViolation<CadastroDTO>> validate = validator.validate(cadastroDTO);

        validate.stream().map(x -> errors.add(x.getMessage()));

        if(!cadastroDTO.getNascimento().matches("^\\d{4}-\\d{2}-\\d{2}$"))
            errors.add("Data de nascimento inválida. Formato xxxx(ano)-xx(mes)-xx(dia)");

        if(!errors.isEmpty())
            return errors;

        Usuario usuario = UsuarioMapper.INSTANCE.cadastroDTOToUsuario(cadastroDTO);
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        ArrayList<Role> roles = new ArrayList<>();
        Role roleUser = new Role();
        roleUser.setId(2); // id do USER
        roles.add(roleUser);

        roleUser.setId(2); // id do USER

        usuario.setRole(roles);

        usuario.setPassword(bCryptPasswordEncoder.encode(usuario.getPassword()));

        try{
            this.usuarioRepository.save(usuario);
        }catch (RuntimeException e){
            e.printStackTrace();
            throw new UniqueException("CPF ou EMAIL já cadastrados.");
        }


        return errors;

    }

    public List<Usuario> GetAll() {

        return this.usuarioRepository.findAll();

    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        return this.usuarioRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("Email não cadastrado."));

    }

}
