import {Component, OnInit} from '@angular/core';
import {Product} from "../../common/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 10
  theTotalElements: number = 0;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void{
    this.route.paramMap.subscribe(() => {
      this.listProduct();
    });
  }

  listProduct() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode){
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts()
    }


  }
  handleSearchProducts() {
  const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

  //now search for the products using keyword
    this.productService.searchProducts(theKeyword).subscribe(
      data =>{
        this.products = data;
      }
    );
  }




  handleListProducts(){
    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      //not category id available ... default category id = 1
      this.currentCategoryId = 1;

    }
    if (this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log('currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageSize}');

    this.productService.getProductListPaginate(this.thePageNumber -1,
                                                this.thePageSize,
                                                this.currentCategoryId).subscribe(
      data =>{
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;

      }
    )
  }

  protected readonly Product = Product;

}
