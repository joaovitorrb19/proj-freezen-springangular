package com.userlogin.v1.domain.service;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.Map.Entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriBuilder;

import com.stripe.exception.StripeException;
import com.userlogin.v1.domain.entity.Categoria;
import com.userlogin.v1.domain.entity.Produto;
import com.userlogin.v1.domain.exceptions.UniqueException;
import com.userlogin.v1.domain.repository.ProdutoRepository;
import com.userlogin.v1.dto.produto.ProdutoCarrinhoDTO;
import com.userlogin.v1.dto.produto.ProdutoEntradaDTO;
import com.userlogin.v1.dto.produto.ProdutoFinalizarCarrinhoDTO;
import com.userlogin.v1.mapper.ProdutoMapper;

import jakarta.persistence.EntityExistsException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

@Service
public class ProdutoService {

    @Autowired
    ProdutoRepository produtoRepository;

    @Autowired
    StripeService stripeService;

    ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();

    Validator validator = this.validatorFactory.getValidator();

    private String criarCheckoutStripe;

    public Set<String> PostProduto(Map<String, String> dados, MultipartFile img) {

        Set<String> resposta = new HashSet<>();

        Path diretorioDestino = Paths.get(System.getProperty("user.home"), "Desktop", "Projeto",
                "proj-freezen-springangular", "frontend", "src", "assets", "imagensProdutos");
        Path caminhoArquivoDestino = diretorioDestino.resolve(img.getOriginalFilename());

        ProdutoEntradaDTO produtoDTOParaCadastro = PopularProdutoDTO(dados.entrySet(),
                caminhoArquivoDestino.toString());

        java.util.Set<ConstraintViolation<ProdutoEntradaDTO>> validate = this.validator
                .validate(produtoDTOParaCadastro);

        if (!validate.isEmpty()) {
            validate.forEach(x -> System.out.println(x.getMessage()));
            validate.forEach(x -> resposta.add(x.getMessage()));
            return resposta;
        }

        Produto produtoParaCadastro = ProdutoMapper.INSTANCE.produtoDtoToProduto(produtoDTOParaCadastro);

        try {
            
            Map<String, String> criarProdutoStripe = this.stripeService.CriarProdutoStripe(produtoParaCadastro);
            produtoParaCadastro.setIdPrecoStripe(criarProdutoStripe.get("idPreco"));
            produtoParaCadastro.setIdProdutoStripe(criarProdutoStripe.get("idProduto"));
            this.produtoRepository.save(produtoParaCadastro);

            byte[] bytes = img.getBytes();

            // Path diretorioDestino =
            // Paths.get("/Desktop/Projeto/proj-freezen-springangular/frontend/src/assets/");
            // Path caminhoArquivoDestino =
            // diretorioDestino.resolve(img.getOriginalFilename());

            if (Files.notExists(caminhoArquivoDestino)) {

                Files.createFile(caminhoArquivoDestino);
                Files.write(caminhoArquivoDestino, bytes);

            }

            resposta.add("Adicionado com sucesso");
            return resposta;
        } catch (Exception e) {
            e.printStackTrace();
            throw new UniqueException("Produto já existe");
        }

    }

    public List<Produto> GetAll() {

        List<Produto> all = this.produtoRepository.findAll();

        return all;
    }

    public Produto GetById(int id) {

        Produto byId = this.produtoRepository.findById(id)
                .orElseThrow(() -> new EntityExistsException("Este produto não existe"));

        return byId;

    }

    public void Delete(int id) {
        this.produtoRepository.deleteById(id);
    }

    public String Update(int id, @RequestParam Map<String, String> dados, MultipartFile img) {

      return PopularProdutoDTOUpdate(id, dados.entrySet(), img);
        

    }

    public ProdutoEntradaDTO PopularProdutoDTO(Set<Entry<String, String>> entrySet, String img) {

        ProdutoEntradaDTO produtoEntradaDTO = new ProdutoEntradaDTO(img);
        List<Categoria> categorias = new ArrayList<>();

        for (Entry<String, String> entry : entrySet) {

            if (entry.getKey().equals("nome"))
                produtoEntradaDTO.setNome(entry.getValue());

            if (entry.getKey().equals("descricao"))
                produtoEntradaDTO.setDescricao(entry.getValue());

            if (entry.getKey().equals("preco"))
                produtoEntradaDTO.setPreco(Double.parseDouble(entry.getValue()));

            if (entry.getKey().contains("categoria"))
                categorias.add(new Categoria(Integer.parseInt(entry.getValue())));
        }

        produtoEntradaDTO.setCategorias(categorias);

        return produtoEntradaDTO;
    }

    public String PopularProdutoDTOUpdate(int id, Set<Entry<String, String>> entrySet, MultipartFile img) {

        Produto produtoBancoDeDados = this.produtoRepository.findById(id)
                .orElseThrow(() -> new EntityExistsException("Id não existe"));

        List<Categoria> categorias = new ArrayList<>();

        for (Entry<String, String> set : entrySet) {

            if (set.getKey().equals("nome") && !set.getValue().equals(produtoBancoDeDados.getNome())) {
                produtoBancoDeDados.setNome(set.getValue());
            }

            if (set.getKey().equals("descricao") && !set.getValue().equals(produtoBancoDeDados.getDescricao())) {
                produtoBancoDeDados.setDescricao(set.getValue());
            }

            if (set.getKey().equals("preco") && Double.parseDouble(set.getValue()) != produtoBancoDeDados.getPreco()) {
                produtoBancoDeDados.setPreco(Double.parseDouble(set.getValue()));
            }

            if (set.getKey().contains("categoria")) {
                categorias.add(new Categoria(Integer.parseInt(set.getValue())));
            }

        }

        if (img != null) {
            Path path = Paths.get(System.getProperty("user.home"), "Desktop", "Projeto", "proj-freezen-springangular",
                    "frontend", "src", "assets", "imagensProdutos");
            Path pathImg = path.resolve(img.getOriginalFilename());

            if (produtoBancoDeDados.getEnderecoImg() != pathImg.toString()) {

                try {

                    if (Files.exists(pathImg)) {
                        Files.delete(Paths.get(produtoBancoDeDados.getEnderecoImg()));
                        produtoBancoDeDados.setEnderecoImg(pathImg.toString());
                        this.produtoRepository.save(produtoBancoDeDados);
                        return "Atualizado com sucesso";

                    }

                    byte[] bytesNovaImg = img.getBytes();
                    Files.createFile(pathImg);
                    Files.write(pathImg, bytesNovaImg);
                    Files.delete(Paths.get(produtoBancoDeDados.getEnderecoImg()));
                    produtoBancoDeDados.setEnderecoImg(pathImg.toString());
                    this.produtoRepository.save(produtoBancoDeDados);
                    return "Atualizado com sucesso";
                } catch (IOException e) {

                }

            }
        }

        this.produtoRepository.save(produtoBancoDeDados);

        return "Atualizado com sucesso";
    }

    public String FinalizarPedido(Map<String,String> produtos) throws StripeException {
            String criarCheckoutStripe = this.stripeService.CriarCheckoutStripe(produtos);
            return criarCheckoutStripe;
    }

}
