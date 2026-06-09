package com.praush.gallery.order;

import com.praush.gallery.painting.Painting;
import com.praush.gallery.painting.PaintingRepository;
import com.praush.gallery.painting.PaintingStatus;
import jakarta.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final PaintingRepository paintingRepository;

    public OrderService(OrderRepository orderRepository, PaintingRepository paintingRepository) {
        this.orderRepository = orderRepository;
        this.paintingRepository = paintingRepository;
    }

    @Transactional
    public OrderResponse createOrder(OrderCreateRequest request) {
        OrderEntity order = new OrderEntity();
        order.setCustomerName(request.customerName());
        order.setCustomerEmail(request.customerEmail());
        order.setCustomerPhone(request.customerPhone());
        order.setShippingAddress(request.shippingAddress());

        BigDecimal total = BigDecimal.ZERO;

        for (OrderCreateRequest.ItemRequest itemRequest : request.items()) {
            if (itemRequest.quantity() == null || itemRequest.quantity() <= 0) {
                throw new IllegalArgumentException("Quantity must be greater than 0");
            }

            Painting painting = paintingRepository.findById(itemRequest.paintingId())
                    .orElseThrow(() -> new EntityNotFoundException("Painting not found: " + itemRequest.paintingId()));

            if (painting.getStatus() != PaintingStatus.AVAILABLE) {
                throw new IllegalArgumentException("Painting is not available: " + painting.getTitle());
            }

            if (painting.getQuantityAvailable() < itemRequest.quantity()) {
                throw new IllegalArgumentException("Insufficient stock for painting: " + painting.getTitle());
            }

            painting.setQuantityAvailable(painting.getQuantityAvailable() - itemRequest.quantity());
            if (painting.getQuantityAvailable() == 0) {
                painting.setStatus(PaintingStatus.SOLD_OUT);
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setPaintingId(painting.getId());
            orderItem.setPaintingTitle(painting.getTitle());
            orderItem.setQuantity(itemRequest.quantity());
            orderItem.setUnitPrice(painting.getPrice());
            order.addItem(orderItem);

            total = total.add(painting.getPrice().multiply(BigDecimal.valueOf(itemRequest.quantity())));
        }

        order.setTotalAmount(total);
        return OrderResponse.fromEntity(orderRepository.save(order));
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll().stream().map(OrderResponse::fromEntity).toList();
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrder(Long id) {
        OrderEntity order = orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Order not found: " + id));
        return OrderResponse.fromEntity(order);
    }
}
