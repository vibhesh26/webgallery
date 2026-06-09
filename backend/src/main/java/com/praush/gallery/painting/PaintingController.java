package com.praush.gallery.painting;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/paintings")
public class PaintingController {

    private final PaintingService paintingService;

    public PaintingController(PaintingService paintingService) {
        this.paintingService = paintingService;
    }

    @GetMapping
    public List<PaintingResponse> getPaintings(@RequestParam(defaultValue = "true") boolean availableOnly) {
        return availableOnly ? paintingService.getAllAvailable() : paintingService.getAll();
    }

    @GetMapping("/{id}")
    public PaintingResponse getPainting(@PathVariable Long id) {
        return paintingService.getById(id);
    }

    @PostMapping
    public PaintingResponse createPainting(@Valid @RequestBody PaintingRequest request) {
        return paintingService.create(request);
    }

    @PutMapping("/{id}")
    public PaintingResponse updatePainting(@PathVariable Long id, @Valid @RequestBody PaintingRequest request) {
        return paintingService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public void deletePainting(@PathVariable Long id) {
        paintingService.delete(id);
    }
}
