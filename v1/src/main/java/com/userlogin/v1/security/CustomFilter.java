package com.userlogin.v1.security;

import com.userlogin.v1.domain.service.UsuarioService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.antlr.v4.runtime.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Configuration
public class CustomFilter extends OncePerRequestFilter {

    @Autowired
    private UsuarioService usuarioService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {     
        
        String authorization = request.getHeader("Authorization");
        String tokenJWT = "";
        String emailUsuarioRequest = "";

        if(authorization == null || SecurityContextHolder.getContext().getAuthentication() != null)
            filterChain.doFilter(request,response);


        if(authorization != null){
            tokenJWT = authorization.substring(9,179);
            System.out.println(authorization);
             emailUsuarioRequest = TokenService.getSubject(tokenJWT);

            UserDetails userDetails = this.usuarioService.loadUserByUsername(emailUsuarioRequest);

            if(!TokenService.verificarValidade(tokenJWT) || userDetails == null )
                filterChain.doFilter(request,response);


            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(emailUsuarioRequest, null, userDetails.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

             filterChain.doFilter(request,response);
        }

    }

}
