import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../datatype';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent {

  cartData: undefined| cart[];
  priceSummary: priceSummary={
  price:0,
  discount: 0,
  tax:0,
  delivery:0,
  total:0
  }
  constructor(private product: ProductService, private route: Router){}

  ngOnInit(){
    this.product.currentCart().subscribe((data) =>{ 
      this.cartData = data;
      console.log("current cart", data);
      let price=0;
      data.forEach((item)=>{
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 10) + 100 - (price / 10);
    })
  }

  checkout(){
    this.route.navigate(["/checkout"])
  }
}
