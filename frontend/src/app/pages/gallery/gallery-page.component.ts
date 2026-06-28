import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Painting } from '../../core/models';

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery-page.component.html',
  styleUrl: './gallery-page.component.css'
})
export class GalleryPageComponent implements OnInit {
  paintings: Painting[] = [];
  loading = false;
  error = '';
  selectedCollection: 'paintings' | 'sketches' = 'sketches';
  selectedImage: Painting | null = null;
  enquiryItem: Painting | null = null;

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

  openEnquiry(painting: Painting): void {
    this.enquiryItem = painting;
  }

  closeEnquiry(): void {
    this.enquiryItem = null;
  }

  get isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  buildEnquiryHref(painting: Painting): string {
    const subject = `Sketch Enquiry - ${painting.title} (No. ${painting.id})`;
    const body = [
      'Hi Praush,',
      '',
      `I am interested in the sketch "${painting.title}" (Sketch No. ${painting.id}, Category: ${painting.category}).`,
      '',
      'Could you please share:',
      '  - Availability',
      '  - Pricing and size details',
      '  - Delivery / shipping options',
      '',
      'My details:',
      'Name:',
      'Phone:',
      'City / Shipping Address:',
      '',
      'Thanks'
    ].join('\n');
    if (this.isMobile) {
      return `mailto:praveenkaran19@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    return `https://mail.google.com/mail/?view=cm&fs=1&to=praveenkaran19%40gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  get customPaintingHref(): string {
    const subject = 'Custom Painting Order';
    const body = [
      'Hi Praush,',
      '',
      'I would like to order a custom painting.',
      '',
      'Details:',
      'Name:',
      'Phone:',
      'Subject / Theme:',
      'Size Preference (e.g. A4 / 12x16 / 24x36):',
      'Medium Preference (e.g. Acrylic / Watercolour / Oil):',
      'Reference Image Link (if any):',
      'Budget Range:',
      'City / Shipping Address:',
      '',
      'Thanks.'
    ].join('\n');
    if (this.isMobile) {
      return `mailto:praveenkaran19@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    return `https://mail.google.com/mail/?view=cm&fs=1&to=praveenkaran19%40gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  get selfPortraitHref(): string {
    const subject = 'Self Portrait Sketch Order';
    const body = [
      'Hi Praush,',
      '',
      'I want to order a self portrait sketch.',
      'Name:',
      'Phone:',
      'Size Preference:',
      'Reference Photo Link:',
      '',
      'Thanks.'
    ].join('\n');
    if (this.isMobile) {
      return `mailto:praveenkaran19@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    return `https://mail.google.com/mail/?view=cm&fs=1&to=praveenkaran19%40gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent): void {
    if (!this.selectedImage && !this.enquiryItem) {
      return;
    }

    event.preventDefault();
    this.closeImagePreview();
    this.closeEnquiry();
  }
}

const LOCAL_PAINTINGS: Painting[] = [
  {
    id: 104,
    title: 'Watercolour Portrait',
    description: 'A delicate watercolour portrait study rendered in warm earth and cool grey tones.',
    imageUrl: '/img/painting-4.jpeg',
    category: 'Portrait',
    price: 11000,
    status: 'AVAILABLE',
    quantityAvailable: 1
  },
  {
    id: 105,
    title: 'Sunny Disposition',
    description: 'Acrylic portrait of a smiling woman in sunglasses, full of energy and colour.',
    imageUrl: '/img/painting-5.jpeg',
    category: 'Portrait',
    price: 9500,
    status: 'AVAILABLE',
    quantityAvailable: 1
  },
  {
    id: 106,
    title: 'Little Krishna',
    description: 'A vibrant coloured-pencil study of baby Krishna adorned with a peacock feather, framed and ready to hang.',
    imageUrl: '/img/painting-6.jpeg',
    category: 'Spiritual',
    price: 14000,
    status: 'AVAILABLE',
    quantityAvailable: 1
  },
  {
    id: 107,
    title: 'Hanuman Chalisa Mandala',
    description: 'The complete Hanuman Chalisa script arranged in a sacred mandala around a portrait of Lord Hanuman, on red.',
    imageUrl: '/img/painting-7.jpeg',
    category: 'Spiritual',
    price: 18000,
    status: 'AVAILABLE',
    quantityAvailable: 1
  },
  {
    id: 112,
    title: 'Golden Hour Reflection',
    description: 'A warm portrait study bathed in late-evening light, with expressive brushwork and soft tonal transitions.',
    imageUrl: '/img/painting-12.jpeg',
    category: 'Portrait',
    price: 12000,
    status: 'AVAILABLE',
    quantityAvailable: 1
  },
  {
    id: 113,
    title: 'Vermilion Grace',
    description: 'A vibrant portrait composition highlighted by rich reds and confident line accents.',
    imageUrl: '/img/painting-13.jpeg',
    category: 'Portrait',
    price: 12000,
    status: 'AVAILABLE',
    quantityAvailable: 1
  },
  {
    id: 114,
    title: 'Quiet Radiance',
    description: 'A serene portrait with balanced shadows and luminous skin tones, designed for an elegant wall presence.',
    imageUrl: '/img/painting-14.jpeg',
    category: 'Portrait',
    price: 12000,
    status: 'AVAILABLE',
    quantityAvailable: 1
  },
  {
    id: 115,
    title: 'Festive Portrait',
    description: 'A celebratory portrait featuring bold color contrasts and finely detailed facial expression.',
    imageUrl: '/img/painting-15.jpeg',
    category: 'Portrait',
    price: 12000,
    status: 'AVAILABLE',
    quantityAvailable: 1
  },
  {
    id: 116,
    title: 'Soulful Eyes',
    description: 'An emotive portrait centered on gaze and mood, blending soft gradients with crisp edge detailing.',
    imageUrl: '/img/painting-16.jpeg',
    category: 'Portrait',
    price: 12000,
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
  },
  {
    id: 204,
    title: 'Soft Gaze Sketch',
    description: 'Graphite sketch portrait with gentle shading and a calm expression.',
    imageUrl: '/img/sketch-4.jpeg',
    category: 'Sketch',
    price: 4600,
    status: 'AVAILABLE',
    quantityAvailable: 1
  },
  {
    id: 205,
    title: 'Contemplative Man',
    description: 'Charcoal sketch of a reclining man in a pensive moment, framed against a patterned backdrop.',
    imageUrl: '/img/sketch-5.jpeg',
    category: 'Sketch',
    price: 5200,
    status: 'AVAILABLE',
    quantityAvailable: 1
  },
  {
    id: 206,
    title: 'Elder Portrait II',
    description: 'Detailed pencil portrait of an elderly man, framed in black — capturing age, dignity and depth.',
    imageUrl: '/img/sketch-6.jpeg',
    category: 'Sketch',
    price: 5500,
    status: 'AVAILABLE',
    quantityAvailable: 1
  },
  {
    id: 207,
    title: 'Joyful Girl',
    description: 'Charcoal portrait of a young girl mid-smile, soft curls framing a warm and lively expression.',
    imageUrl: '/img/sketch-7.jpeg',
    category: 'Sketch',
    price: 4500,
    status: 'AVAILABLE',
    quantityAvailable: 1
  },
  {
    id: 208,
    title: 'Woman in Dupatta',
    description: 'Pencil study of a traditionally dressed woman, sketched with graceful lines and soft shading.',
    imageUrl: '/img/sketch-8.jpeg',
    category: 'Sketch',
    price: 4200,
    status: 'AVAILABLE',
    quantityAvailable: 1
  },
  {
    id: 209,
    title: 'Sepia Portrait',
    description: 'A striking portrait executed in coffee/sepia wash, giving a warm vintage quality to the likeness.',
    imageUrl: '/img/sketch-9.jpeg',
    category: 'Sketch',
    price: 5000,
    status: 'AVAILABLE',
    quantityAvailable: 1
  },
  {
    id: 210,
    title: 'Bridal Portrait',
    description: 'Pencil portrait of a bride in full jewellery, captured with fine detail and gentle expression.',
    imageUrl: '/img/sketch-10.jpeg',
    category: 'Sketch',
    price: 5500,
    status: 'AVAILABLE',
    quantityAvailable: 1
  },
  {
    id: 211,
    title: 'Young Man with Glasses',
    description: 'Realistic graphite portrait of a young man with spectacles — precise linework and tonal depth.',
    imageUrl: '/img/sketch-11.jpeg',
    category: 'Sketch',
    price: 4800,
    status: 'AVAILABLE',
    quantityAvailable: 1
  },
  {
    id: 212,
    title: 'Couple Portrait',
    description: 'Double charcoal portrait of a couple, with expressive shading and warm accent tones.',
    imageUrl: '/img/sketch-12.jpeg',
    category: 'Sketch',
    price: 7500,
    status: 'AVAILABLE',
    quantityAvailable: 1
  },
  {
    id: 213,
    title: 'Baby Krishna Sketch',
    description: 'Large-format charcoal sketch of baby Krishna adorned with peacock feather and jewellery, deeply detailed.',
    imageUrl: '/img/sketch-13.jpeg',
    category: 'Sketch',
    price: 8500,
    status: 'AVAILABLE',
    quantityAvailable: 1
  },
  {
    id: 227,
    title: 'Twilight Study',
    description: 'A textured graphite sketch with layered shading and subtle contrast for a dramatic portrait finish.',
    imageUrl: '/img/sketch-27.jpeg',
    category: 'Sketch',
    price: 5000,
    status: 'AVAILABLE',
    quantityAvailable: 1
  },
  {
    id: 228,
    title: 'Calm Contour',
    description: 'A clean-line pencil sketch capturing gentle expression and depth through controlled tonal blending.',
    imageUrl: '/img/sketch-28.jpeg',
    category: 'Sketch',
    price: 5000,
    status: 'AVAILABLE',
    quantityAvailable: 1
  }
];
