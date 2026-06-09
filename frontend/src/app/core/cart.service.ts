import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Painting } from './models';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly itemsSubject = new BehaviorSubject<CartItem[]>([]);
  readonly items$ = this.itemsSubject.asObservable();

  addToCart(painting: Painting): void {
    const items = [...this.itemsSubject.value];
    const existing = items.find((item) => item.painting.id === painting.id);

    if (existing) {
      if (existing.quantity < painting.quantityAvailable) {
        existing.quantity += 1;
      }
    } else {
      items.push({ painting, quantity: 1 });
    }

    this.itemsSubject.next(items);
  }

  removeFromCart(paintingId: number): void {
    this.itemsSubject.next(this.itemsSubject.value.filter((item) => item.painting.id !== paintingId));
  }

  clearCart(): void {
    this.itemsSubject.next([]);
  }

  getSnapshot(): CartItem[] {
    return this.itemsSubject.value;
  }

  getTotal(): number {
    return this.itemsSubject.value.reduce((sum, item) => sum + item.painting.price * item.quantity, 0);
  }
}
