import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { product } from '../datatype';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [ProductService, Router],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.scss'
})
export class SellerAddProductComponent {
  //addProduct: ng;

  constructor(private product: ProductService) { } 

  addProductMessage: string | undefined;
  

  ngOnInit(): void {}

  submit(data: product) {
    this.product.addProducts(data).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.addProductMessage = 'Product is added successfully';
      }
    });

    setTimeout(() => {
      this.addProductMessage=undefined
      //this.addProduct.reset();
    }, 3000);
  }

  
//   submit(data: any){
//  this.product.addProducts(data);
//   }

}
