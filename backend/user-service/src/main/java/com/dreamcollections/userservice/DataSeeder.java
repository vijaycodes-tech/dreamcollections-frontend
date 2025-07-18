package com.dreamcollections.userservice;

import com.dreamcollections.userservice.model.Role;
import com.dreamcollections.userservice.model.User;
import com.dreamcollections.userservice.repository.RoleRepository;
import com.dreamcollections.userservice.repository.UserRepository;
import java.util.HashSet;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (roleRepository.findByName("ROLE_USER").isEmpty()) {
            roleRepository.save(new Role() {{ setName("ROLE_USER"); }});
        }
        if (roleRepository.findByName("ROLE_ADMIN").isEmpty()) {
            roleRepository.save(new Role() {{ setName("ROLE_ADMIN"); }});
        }

        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("password"));
            admin.setEmail("admin@dreamcollections.com");
            admin.setPhone("1234567890");

            Set<Role> roles = new HashSet<>();
            Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(adminRole);
            admin.setRoles(roles);

            userRepository.save(admin);
        }
    }
}
