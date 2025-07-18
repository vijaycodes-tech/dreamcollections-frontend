package com.dreamcollections.userservice.dto;

import lombok.Data;

@Data
public class UserDto {
    private String username;
    private String password;
    private String email;
    private String phone;
}
