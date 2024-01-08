package com.userlogin.v1.domain.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.userlogin.v1.domain.entity.Role;

public interface RoleRepository extends JpaRepository<Role,Integer>{

    Optional<Role> findByRole(String role);
}
