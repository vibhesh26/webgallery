package com.praush.gallery.painting;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaintingService {

    private final PaintingRepository paintingRepository;

    public PaintingService(PaintingRepository paintingRepository) {
        this.paintingRepository = paintingRepository;
    }

    @Transactional(readOnly = true)
    public List<PaintingResponse> getAllAvailable() {
        return paintingRepository.findByStatusOrderByCreatedAtDesc(PaintingStatus.AVAILABLE)
                .stream()
                .map(PaintingResponse::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<PaintingResponse> getAll() {
        return paintingRepository.findAll()
                .stream()
                .map(PaintingResponse::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public PaintingResponse getById(Long id) {
        Painting painting = paintingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Painting not found: " + id));
        return PaintingResponse.fromEntity(painting);
    }

    @Transactional
    public PaintingResponse create(PaintingRequest request) {
        Painting painting = new Painting();
        applyRequest(painting, request);
        return PaintingResponse.fromEntity(paintingRepository.save(painting));
    }

    @Transactional
    public PaintingResponse update(Long id, PaintingRequest request) {
        Painting painting = paintingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Painting not found: " + id));
        applyRequest(painting, request);
        return PaintingResponse.fromEntity(paintingRepository.save(painting));
    }

    @Transactional
    public void delete(Long id) {
        if (!paintingRepository.existsById(id)) {
            throw new EntityNotFoundException("Painting not found: " + id);
        }
        paintingRepository.deleteById(id);
    }

    @Transactional
    public void decreaseStock(Long paintingId, int quantity) {
        Painting painting = paintingRepository.findById(paintingId)
                .orElseThrow(() -> new EntityNotFoundException("Painting not found: " + paintingId));

        int current = painting.getQuantityAvailable();
        if (quantity <= 0 || quantity > current) {
            throw new IllegalArgumentException("Insufficient stock for painting id " + paintingId);
        }

        painting.setQuantityAvailable(current - quantity);
        if (painting.getQuantityAvailable() == 0) {
            painting.setStatus(PaintingStatus.SOLD_OUT);
        }
    }

    private void applyRequest(Painting painting, PaintingRequest request) {
        painting.setTitle(request.title());
        painting.setDescription(request.description());
        painting.setImageUrl(request.imageUrl());
        painting.setCategory(request.category());
        painting.setPrice(request.price());
        painting.setStatus(request.status());
        painting.setQuantityAvailable(request.quantityAvailable());
    }
}
