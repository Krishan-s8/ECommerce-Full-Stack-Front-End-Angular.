import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../common/product";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;
  constructor(private route: ActivatedRoute,
              private productService: ProductService) {

  }

  ngOnInit(): void {
      this.route.paramMap.subscribe(() =>{
        this.handleProductDetails();
      }) ;
    }

   handleProductDetails() {
     //get the id param string. convert to a number using the + symbol
     const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

     this.productService.getProduct(theProductId).subscribe(
       data =>{
         this.product = data;
       }
     );
  }
}
