package com.praush.gallery.auth;

public record AuthUserResponse(
        boolean authenticated,
        String name,
        String email,
        String picture
) {
    public static AuthUserResponse anonymous() {
        return new AuthUserResponse(false, null, null, null);
    }
}
