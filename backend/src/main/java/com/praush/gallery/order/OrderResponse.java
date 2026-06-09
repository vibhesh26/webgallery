package com.praush.gallery.order;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record OrderResponse(
        Long id,
        String customerName,
        String customerEmail,
        String customerPhone,
        String shippingAddress,
        BigDecimal totalAmount,
        OrderStatus status,
        Instant createdAt,
        List<ItemResponse> items
) {
    public record ItemResponse(
            Long paintingId,
            String paintingTitle,
            Integer quantity,
            BigDecimal unitPrice
    ) {}

    public static OrderResponse fromEntity(OrderEntity entity) {
        List<ItemResponse> items = entity.getItems().stream()
                .map(item -> new ItemResponse(
                        item.getPaintingId(),
                        item.getPaintingTitle(),
                        item.getQuantity(),
                        item.getUnitPrice()
                ))
                .toList();

        return new OrderResponse(
                entity.getId(),
                entity.getCustomerName(),
                entity.getCustomerEmail(),
                entity.getCustomerPhone(),
                entity.getShippingAddress(),
                entity.getTotalAmount(),
                entity.getStatus(),
                entity.getCreatedAt(),
                items
        );
    }
}
