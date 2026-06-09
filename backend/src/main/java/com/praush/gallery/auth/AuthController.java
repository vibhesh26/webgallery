package com.praush.gallery.auth;

import java.util.Map;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @GetMapping("/me")
    public AuthUserResponse me(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return AuthUserResponse.anonymous();
        }

        Map<String, Object> attributes = principal.getAttributes();
        return new AuthUserResponse(
                true,
                attributeAsString(attributes, "name"),
                attributeAsString(attributes, "email"),
                attributeAsString(attributes, "picture")
        );
    }

    private String attributeAsString(Map<String, Object> attributes, String key) {
        Object value = attributes.get(key);
        return value == null ? null : value.toString();
    }
}
