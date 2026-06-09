export interface Painting {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  price: number;
  status: 'AVAILABLE' | 'SOLD_OUT' | 'HIDDEN';
  quantityAvailable: number;
}

export interface CartItem {
  painting: Painting;
  quantity: number;
}

export interface OrderRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  items: Array<{ paintingId: number; quantity: number }>;
}

export interface OrderResponse {
  id: number;
  totalAmount: number;
  status: string;
}
