export type UserRole = 'courier' | 'customer' | null;

export interface Order {
  id: string;
  customerName: string;
  address: string;
  status: 'pending' | 'preparing' | 'on_way' | 'delivered';
  items: OrderItem[];
  distance: string;
  estimatedTime: string;
  priority: boolean;
  price: number;
  earning?: number;
  date: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  icon?: string;
}

export interface CourierStats {
  totalDeliveries: number;
  successRate: number;
  rating: number;
  dailyEarnings: number;
  activeTime: string;
}
