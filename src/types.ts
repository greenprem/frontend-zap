export type NavigationSection = 'sell' | 'buy' | 'scrap';

export interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  condition: string;
  category: string;
  imageUrl: string;
  sellerRating: number;
  createdAt: Date;
}

export interface ScrapItem {
  id: string;
  title: string;
  description: string;
  materialType: string;
  weight: number;
  condition: string;
  imageUrl: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  rating: number;
}