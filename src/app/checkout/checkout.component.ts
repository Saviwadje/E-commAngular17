import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { cart, order } from '../datatype';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  totalPrice : number| undefined;
  constructor(private product: ProductService, private router: Router){}
  cartData: cart[] | undefined;
  orderMsg: string | undefined;

  ngOnInit(){
    this.product.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      this.totalPrice = price + (price / 10) + 100 - (price / 10);

      console.warn(this.totalPrice);

    })
  }

  orderNow(data: { email: string, address: string, contact: string }){
    let user = localStorage.getItem('user');
    let userId= user && JSON.parse(user).body[0].id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }
    
      this.cartData?.forEach((item) => {
        setTimeout(() => {
          console.log("beforing clearing data", this.cartData )
          item.id && this.product.deleteCartItems(item.id);
        }, 600)
      }) 

      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMsg = "Your Order has been placed!!!";}});
          setTimeout(() => {
            this.orderMsg = undefined;
            this.router.navigate(['/my-orders'])
          }, 4000);

  }
}

}
