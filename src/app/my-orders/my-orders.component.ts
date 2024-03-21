import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../datatype';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent {

  orderData: order[] | undefined;

  constructor( private product: ProductService){}

  ngOnInit(){
    this.getOrderList()
  }

  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderData=result;
    })
  }

  cancelOrder(orderId:number|undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      if(result){
        this.getOrderList();
        console.log("order cancelled")
      }
    })
  }


}
