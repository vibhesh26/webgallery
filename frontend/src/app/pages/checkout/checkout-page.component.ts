import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../core/cart.service';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent {
  readonly cartItems = this.cartService.items$;
  placingOrder = false;
  error = '';

  readonly form = this.fb.group({
    customerName: ['', [Validators.required]],
    customerEmail: ['', [Validators.required, Validators.email]],
    customerPhone: ['', [Validators.required]],
    shippingAddress: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private cartService: CartService
  ) {}

  get total(): number {
    return this.cartService.getTotal();
  }

  removeItem(paintingId: number): void {
    this.cartService.removeFromCart(paintingId);
  }

  placeOrder(): void {
    if (this.form.invalid || this.cartService.getSnapshot().length === 0) {
      this.form.markAllAsTouched();
      return;
    }

    this.error = '';
    this.openGmailOrderDraft();
  }

  private openGmailOrderDraft(): void {
    const customerName = this.form.value.customerName ?? '';
    const customerEmail = this.form.value.customerEmail ?? '';
    const customerPhone = this.form.value.customerPhone ?? '';
    const shippingAddress = this.form.value.shippingAddress ?? '';

    const itemLines = this.cartService.getSnapshot().map((item, index) => {
      const lineTotal = item.painting.price * item.quantity;
      return `${index + 1}. Painting No ${item.painting.id} - ${item.painting.title} (${item.painting.category}) - Qty ${item.quantity}, Price INR ${lineTotal.toFixed(2)}`;
    }).join('\n');

    const body = [
      'Hi Praush,',
      '',
      'I want to place an artwork order.',
      '',
      `Customer Name: ${customerName}`,
      `Customer Email: ${customerEmail}`,
      `Customer Phone: ${customerPhone}`,
      `Shipping Address: ${shippingAddress}`,
      '',
      'Selected Items:',
      itemLines,
      '',
      `Estimated Total: INR ${this.total.toFixed(2)}`,
      '',
      'Please confirm availability and next steps.',
      '',
      'Thanks'
    ].join('\n');

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=praveenkaran19%40gmail.com&su=${encodeURIComponent('Artwork Order Request - Praush Paintings and Sketch')}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
  }
}
