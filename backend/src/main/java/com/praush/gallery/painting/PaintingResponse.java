package com.praush.gallery.painting;

import java.math.BigDecimal;
import java.time.Instant;

public record PaintingResponse(
        Long id,
        String title,
        String description,
        String imageUrl,
        String category,
        BigDecimal price,
        PaintingStatus status,
        Integer quantityAvailable,
        Instant createdAt,
        Instant updatedAt
) {
    public static PaintingResponse fromEntity(Painting painting) {
        return new PaintingResponse(
                painting.getId(),
                painting.getTitle(),
                painting.getDescription(),
                painting.getImageUrl(),
                painting.getCategory(),
                painting.getPrice(),
                painting.getStatus(),
                painting.getQuantityAvailable(),
                painting.getCreatedAt(),
                painting.getUpdatedAt()
        );
    }
}
