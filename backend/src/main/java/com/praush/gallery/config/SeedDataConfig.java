package com.praush.gallery.config;

import com.praush.gallery.painting.Painting;
import com.praush.gallery.painting.PaintingRepository;
import com.praush.gallery.painting.PaintingStatus;
import java.math.BigDecimal;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SeedDataConfig {

    @Bean
    CommandLineRunner seedPaintings(PaintingRepository paintingRepository) {
        return args -> {
            if (paintingRepository.count() > 0) {
                return;
            }

            paintingRepository.save(build(
                    "Monsoon Silence",
                    "A layered acrylic landscape inspired by rainy evenings and old city lights.",
                    "https://images.unsplash.com/photo-1577083552431-6e5fd75f7fbc?auto=format&fit=crop&w=1200&q=80",
                    "Landscape",
                    new BigDecimal("12000.00"),
                    1
            ));

            paintingRepository.save(build(
                    "Terracotta Morning",
                    "Warm earth tones and textured strokes, ideal for living room walls.",
                    "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80",
                    "Abstract",
                    new BigDecimal("7500.00"),
                    2
            ));

            paintingRepository.save(build(
                    "Sketches of Time",
                    "Graphite and charcoal portrait study from the Praush sketch collection.",
                    "https://images.unsplash.com/photo-1459908676235-d5f02a50184b?auto=format&fit=crop&w=1200&q=80",
                    "Sketch",
                    new BigDecimal("4500.00"),
                    3
            ));
        };
    }

    private Painting build(String title, String description, String imageUrl, String category, BigDecimal price, int stock) {
        Painting painting = new Painting();
        painting.setTitle(title);
        painting.setDescription(description);
        painting.setImageUrl(imageUrl);
        painting.setCategory(category);
        painting.setPrice(price);
        painting.setStatus(PaintingStatus.AVAILABLE);
        painting.setQuantityAvailable(stock);
        return painting;
    }
}
