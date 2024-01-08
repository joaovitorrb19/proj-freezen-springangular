package com.userlogin.v1.domain.service;

import com.userlogin.v1.domain.entity.Categoria;
import com.userlogin.v1.domain.exceptions.UniqueException;
import com.userlogin.v1.domain.repository.CategoriaRepository;
import com.userlogin.v1.dto.categoria.CategoriaUpdateDTO;
import com.userlogin.v1.dto.categoria.PostCategoriaDTO;
import com.userlogin.v1.dto.categoria.ViewModelCategoriaDTO;
import com.userlogin.v1.mapper.CategoriaMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;

    ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    Validator validator = this.factory.getValidator();

    public Set<String> Post(PostCategoriaDTO postCategoriaDTO){

        Set<ConstraintViolation<PostCategoriaDTO>> validate = this.validator.validate(postCategoriaDTO);
        Set<String> resposta = new HashSet<>();

        if(!validate.isEmpty()){
          validate.forEach(x -> resposta.add(x.getMessage()));
          return resposta;
        }

        Categoria categoria = CategoriaMapper.INSTANCE.dtoToCategoria(postCategoriaDTO);

        try{
            categoriaRepository.save(categoria);
        } catch(Exception e){
                throw new UniqueException("Categoria " + postCategoriaDTO.getNome() + " já existe.");
        }
        

        resposta.add("Categoria "+categoria.getNome() + " cadastrada com sucesso!");

        return resposta;
    }

    public List<ViewModelCategoriaDTO> GetAll(){

        List<Categoria> categorias = this.categoriaRepository.findAll();
        return CategoriaMapper.INSTANCE.categoriasToListDto(categorias);

    }


    public void Delete(int id) {
        
        this.categoriaRepository.deleteById(id);

    }

    public ViewModelCategoriaDTO GetById(int id) {

        Categoria categoria = this.categoriaRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Categoria não encontrada."));

        return CategoriaMapper.INSTANCE.categoriaToViewModelDTO(categoria);
    }


    public CategoriaUpdateDTO Update(CategoriaUpdateDTO categoriaUpdateDTO) {
        Categoria categoria = CategoriaMapper.INSTANCE.INSTANCE.categoriaUpdateToCategoria(categoriaUpdateDTO);
        this.categoriaRepository.save(categoria);
        return categoriaUpdateDTO;
    }
}
