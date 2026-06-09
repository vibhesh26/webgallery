package com.praush.gallery.order;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

public record OrderCreateRequest(
        @NotBlank @Size(max = 120) String customerName,
        @NotBlank @Email @Size(max = 160) String customerEmail,
        @NotBlank @Size(max = 30) String customerPhone,
        @NotBlank @Size(max = 500) String shippingAddress,
        @NotEmpty List<@Valid ItemRequest> items
) {
    public record ItemRequest(
            @NotNull Long paintingId,
            @NotNull Integer quantity
    ) {}
}
