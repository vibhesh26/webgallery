import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Painting } from '../../core/models';

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './gallery-page.component.html',
  styleUrl: './gallery-page.component.css'
})
export class GalleryPageComponent implements OnInit {
  paintings: Painting[] = [];
  loading = false;
  error = '';
  selectedCollection: 'paintings' | 'sketches' = 'sketches';
  selectedImage: Painting | null = null;

  get paintingWorks(): Painting[] {
    return this.paintings.filter((item) => item.category.toLowerCase() !== 'sketch');
  }

  get sketchWorks(): Painting[] {
    return this.paintings.filter((item) => item.category.toLowerCase() === 'sketch');
  }

  constructor() {}

  ngOnInit(): void {
    this.paintings = LOCAL_PAINTINGS;
  }

  orderViaGmail(painting: Painting): void {
    const body = [
      'Hi Praush,',
      '',
      'I want to order this artwork.',
      '',
      `Unique Painting No: ${painting.id}`,
      `Painting Title: ${painting.title}`,
      `Category: ${painting.category}`,
      `Price: INR ${Number(painting.price).toFixed(2)}`,
      'Quantity: 1',
      '',
      'Customer Name:',
      'Customer Phone:',
      'Shipping Address:',
      '',
      'Please confirm availability and payment steps.',
      '',
      'Thanks'
    ].join('\n');

    const subject = `Artwork Order Request - Painting No ${painting.id}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=praveenkaran19%40gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
  }

  selectCollection(collection: 'paintings' | 'sketches'): void {
    this.selectedCollection = collection;
  }

  openImagePreview(painting: Painting): void {
    this.selectedImage = painting;
  }

  closeImagePreview(): void {
    this.selectedImage = null;
  }
}

const LOCAL_PAINTINGS: Painting[] = [
  {
    id: 101,
    title: 'Monsoon Silence',
    description: 'A layered acrylic landscape inspired by rainy evenings and old city lights.',
    imageUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd75f7fbc?auto=format&fit=crop&w=1200&q=80',
    category: 'Landscape',
    price: 12000,
    status: 'AVAILABLE',
    quantityAvailable: 1
  },
  {
    id: 102,
    title: 'Terracotta Morning',
    description: 'Warm earth tones and textured strokes, ideal for living room walls.',
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80',
    category: 'Abstract',
    price: 7500,
    status: 'AVAILABLE',
    quantityAvailable: 2
  },
  {
    id: 103,
    title: 'Blue Courtyard',
    description: 'A calm courtyard composition with indigo and sandstone contrasts.',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=80',
    category: 'Modern',
    price: 9800,
    status: 'AVAILABLE',
    quantityAvailable: 1
  },
  {
    id: 201,
    title: 'Sketches of Time',
    description: 'Graphite and charcoal portrait study from the Praush sketch collection.',
    imageUrl: '/img/sketch-1.jpg',
    category: 'Sketch',
    price: 4500,
    status: 'AVAILABLE',
    quantityAvailable: 3
  },
  {
    id: 202,
    title: 'Quiet Profile',
    description: 'Fine-line profile sketch with soft charcoal gradients.',
    imageUrl: '/img/sketch-2.jpg',
    category: 'Sketch',
    price: 3800,
    status: 'AVAILABLE',
    quantityAvailable: 2
  },
  {
    id: 203,
    title: 'Classic Portrait Study',
    description: 'Detailed portrait pencil work from the latest sketch drop.',
    imageUrl: '/img/sketch-3.jpg',
    category: 'Sketch',
    price: 4200,
    status: 'AVAILABLE',
    quantityAvailable: 1
  }
];
