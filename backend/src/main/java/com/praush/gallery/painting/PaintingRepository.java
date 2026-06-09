package com.praush.gallery.painting;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaintingRepository extends JpaRepository<Painting, Long> {
    List<Painting> findByStatusOrderByCreatedAtDesc(PaintingStatus status);
}
