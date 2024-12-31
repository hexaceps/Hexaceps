package com.example.hexaqna.dto;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.NotEmpty;

@Getter
@Setter
public class LoginForm {

    private String email;


    private String password;
}
