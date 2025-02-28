import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../../core/services/catagory.service';

@Component({
  selector: 'app-category-detail',
  standalone: false,
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss',
})
export class CategoryDetailComponent implements OnInit {
  category: string = '';
  products: any[] = [];
  loading: boolean = true;

  constructor(
    private _route: ActivatedRoute,
    private _categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.category = params['category'];
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.loading = true;
    this._categoryService.getProductsByCategory(this.category).subscribe({
      next: (products) => {
        console.log('Produits récupérés:', products);
        this.products = products;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des produits:', error);
        this.loading = false;
      },
    });
  }
}
