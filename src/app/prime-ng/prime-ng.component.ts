// app.component.ts
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './prime-ng.component.html',
  styleUrls: ['./prime-ng.component.css'],
  imports:[TableModule]
})
export class PrimeNgComponent {
  products: Product[] = [
    { id: 1, name: 'iPad', price: 700, category: 'Electronics' },
    { id: 2, name: 'Laptop', price: 1200, category: 'Electronics' },
    { id: 3, name: 'Watch', price: 250, category: 'Accessories' }
  ];
}
