package com.praush.gallery.painting;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public record PaintingRequest(
        @NotBlank @Size(max = 120) String title,
        @NotBlank @Size(max = 3000) String description,
        @NotBlank @Size(max = 500) String imageUrl,
        @NotBlank @Size(max = 60) String category,
        @NotNull @DecimalMin("0.01") BigDecimal price,
        @NotNull PaintingStatus status,
        @NotNull @Min(0) Integer quantityAvailable
) {}
