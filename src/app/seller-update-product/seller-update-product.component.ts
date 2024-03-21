import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../datatype';

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [ProductService, Router],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.scss'
})
export class SellerUpdateProductComponent {
  productData: undefined | product;
  productMessage: undefined | string;
  constructor(private route: ActivatedRoute, private product: ProductService, private rout: Router ) {}
  
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((data: any) => {
      console.warn(data);
      this.productData = data;
    });
  }

  submit(data:any){
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product has updated';
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
      this.rout.navigate(['/seller-home'])
    }, 3000);

    console.warn(data);
  }
  

}
