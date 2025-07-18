package com.dreamcollections.userservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class UserDto {
    @NotEmpty
    private String username;
    @NotEmpty
    private String password;
    @Email
    private String email;
    private String phone;
}
