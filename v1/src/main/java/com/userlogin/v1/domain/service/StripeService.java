package com.userlogin.v1.domain.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Price;
import com.stripe.model.Product;
import com.stripe.param.PriceCreateParams;
import com.stripe.param.ProductCreateParams;
import com.userlogin.v1.domain.entity.Produto;
import com.userlogin.v1.dto.produto.ProdutoCarrinhoDTO;
import com.userlogin.v1.dto.produto.ProdutoFinalizarCarrinhoDTO;

@Service
public class StripeService {
    
    public Map<String,String> CriarProdutoStripe(Produto produto) throws StripeException{
        HashMap<String, String> resposta = new HashMap<>();

        Stripe.apiKey = "sk_test_51OUEY8DzQaP5qUkQfvYljuMK35SLBR6msLtuOfXNxbUsirhMygYzFhzrZcn4R5JuOiJstG6kalvQ993SuxnJAP4G00JiOpJlPE";

        ProductCreateParams productParams = ProductCreateParams
        .builder().setName(produto.getNome())
        .setDescription(produto.getDescricao())
        
        .build();

        Product product = Product.create(productParams);        
        boolean duasCasasDecimais = produto.getPreco().toString().substring(produto.getPreco().toString().indexOf(".")).length() > 2 ? true : false;
        Long precoProdutoInCents =  duasCasasDecimais ? Long.parseLong(produto.getPreco().toString().replace(",","").replace(".","")) : Long.parseLong(produto.getPreco().toString().replace(".", "").replace(",", "")+"0");

        PriceCreateParams priceCreateParams = PriceCreateParams.builder()
        .setProduct(product.getId())
        .setCurrency("brl")
        .setUnitAmount(precoProdutoInCents)
        .setRecurring(null)
        .build();

        Price price = Price.create(priceCreateParams);
        resposta.put("idProduto",product.getId());
        resposta.put("idPreco",price.getId());
        return resposta;
    }


    public String CriarCheckoutStripe(Map<String,String> produtos) throws StripeException{
          Stripe.apiKey = "sk_test_51OUEY8DzQaP5qUkQfvYljuMK35SLBR6msLtuOfXNxbUsirhMygYzFhzrZcn4R5JuOiJstG6kalvQ993SuxnJAP4G00JiOpJlPE";

                List<com.stripe.param.checkout.SessionCreateParams.LineItem> listaItem = new ArrayList<>();
                 
                for(var item : produtos.entrySet()){
                    String[] split = item.getValue().split("-");
                    long longValor = Long.parseLong(split[0]);
                    com.stripe.param.checkout.SessionCreateParams.LineItem lineItem = com.stripe.param.checkout.SessionCreateParams.LineItem.builder().setQuantity(longValor)
                    .setPrice(split[1]).build();
                    listaItem.add(lineItem);

                   
                }

                String localhost = "http://localhost:4200";

                com.stripe.param.checkout.SessionCreateParams params =  com.stripe.param.checkout.SessionCreateParams.builder()
                .setMode(com.stripe.param.checkout.SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(localhost)
                .setCancelUrl(localhost)
                .addAllLineItem(listaItem).build();
                
                com.stripe.model.checkout.Session session2 = com.stripe.model.checkout.Session.create(params);
                return session2.getUrl();
    }   


}
