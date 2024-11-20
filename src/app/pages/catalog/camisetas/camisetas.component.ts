import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Product } from '../../../interfaces/product';
import { ProductService } from '../../../../app/services/product.service';
import { HomeComponent } from "../../home/home.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-camisetas',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, HomeComponent,CommonModule],
  templateUrl: './camisetas.component.html',
  styleUrls: ['./camisetas.component.css']
})
export class CamisetasComponent {
  products: Product[] = []; // Todos los productos
  filteredProducts: Product[] = []; // Productos filtrados

  constructor(private productService: ProductService) {}

 

  // Función para filtrar productos por categoría
  filtrarPorCategoria(category: string): void {
    if (category === '672a750670de006914b61ca4') {
      this.filteredProducts = [...this.products]; // Si es "todos", mostramos todos los productos
    } else {
      this.filteredProducts = this.products.filter(product => product.category === category); // Filtramos por categoría
    }
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (products) => {
        if (Array.isArray(products)) {
          this.products = products;
          this.filtrarPorCategoria('camisetas'); // Aplica el filtro después de obtener los productos
        } else {
          console.error("La respuesta no es un array:", products);
        }
      },
      (error) => {
        console.error("Error al obtener los productos:", error);
      }
    );
  }
}