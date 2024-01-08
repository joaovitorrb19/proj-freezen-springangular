package com.userlogin.v1.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
public class TokenService {

    private static String  chave = "KDASOKFDOAS!%!ASDasfAS!@@SDASDA13125412";

    public static String gerarToken(String email,String authority){

        Instant.now().atOffset(ZoneOffset.of("-03:00"));

        return JWT.create().withSubject(email)
                .withExpiresAt(Instant.now().atOffset(ZoneOffset.of("-03:00")).toInstant().plus(10L, ChronoUnit.MINUTES)) 
                .withClaim("Authority", authority)
                .sign(Algorithm.HMAC256(chave));
    }

    public static String getSubject(String tokenJWT){
        return JWT.decode(tokenJWT).getSubject();
    }

    public static boolean verificarValidade(String tokkenJWT){

        Date expiresAt = JWT.decode(tokkenJWT).getExpiresAt();

        Date dataAgora = Date.from(Instant.now().atOffset(ZoneOffset.of("-03:00")).toInstant());

        boolean expirado = dataAgora.before(expiresAt);

        return expirado;

    }

}
