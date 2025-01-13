package com.example.hexaqna.dto;

public class LoginRequest {
    private String accessToken;

    // Getter
    public String getAccessToken() {
        return accessToken;
    }

    // Setter
    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    // Optional: toString for debugging
    @Override
    public String toString() {
        return "LoginRequest{" +
                "accessToken='" + accessToken + '\'' +
                '}';
    }
}
