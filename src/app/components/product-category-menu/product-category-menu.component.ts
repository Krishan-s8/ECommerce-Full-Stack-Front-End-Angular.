import {Component, OnInit} from '@angular/core';
import {ProductCategory} from "../../common/product-category";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})
export class ProductCategoryMenuComponent implements OnInit {
  productCategories: ProductCategory[] = [];

  // inject the service
  constructor(private productService: ProductService) {
  }
ngOnInit() {
    this.listProductCategories();
}

   listProductCategories() {
    // invoke the service
     this.productService.getProductCategories().subscribe(
       data => {
         console.log('Product Catgeories' + JSON.stringify(data));
         this.productCategories = data;
       }
     );
  }
}
