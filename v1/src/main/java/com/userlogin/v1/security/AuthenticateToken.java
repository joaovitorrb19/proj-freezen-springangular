package com.userlogin.v1.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthenticateToken {

    @Autowired
    private AuthenticationManager authenticationManager;

    public Authentication authentication(UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken){
        return this.authenticationManager.authenticate(usernamePasswordAuthenticationToken);
    }

}
