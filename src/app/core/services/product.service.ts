import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _apiUrl = 'http://localhost:3000';

  constructor(private _http: HttpClient) {}

  // Récupérer un produit par son slug
  getProductBySlug(slug: string): Observable<Product> {
    return this._http.get<Product[]>(`${this._apiUrl}/products`).pipe(
      map((products) => {
        const product = products.find((p) => p.slug === slug);
        if (!product) {
          throw new Error(
            `Le produit avec le slogan "${slug}" n'a pas été trouvé`
          );
        }
        return product;
      })
    );
  }

  // Récupérer des produits par leurs slugs (pour les produits suggérés)
  getProductsBySlugs(slugs: string[]): Observable<Product[]> {
    return this._http.get<Product[]>(`${this._apiUrl}/products`).pipe(
      map((products) => {
        return products.filter((product) => slugs.includes(product.slug));
      })
    );
  }
}
