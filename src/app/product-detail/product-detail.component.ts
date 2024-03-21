import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../datatype';
import { CommonModule } from '@angular/common';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  productData:undefined | product;
  productQuantity:number=1;
  removeCart=false;
  cartData:product|undefined;

  constructor(private activeRoute:ActivatedRoute, private product:ProductService) { }

  ngOnInit(){
    let productId= this.activeRoute.snapshot.paramMap.get('productId'); // get id of selected product from activated route
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((result:any)=>{
      this.productData= result;
      // when user is not logged in
      let cartData= localStorage.getItem('localCart');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:product)=>productId=== item.id.toString());
        if(items.length){
          this.removeCart=true
        }else{
          this.removeCart=false
        }
      }
     // when user is logged in
      let user = localStorage.getItem('user');
      if(user){
        let userId= user && JSON.parse(user).body[0].id;
        console.log("product detail ngOnInit checking userID", userId)
        this.product.getCartList(userId);

        this.product.cartData.subscribe((result)=>{
        let item = result.filter((item:product)=>productId?.toString()===item.productId?.toString())
       if(item.length){
       this.cartData=item[0];
        this.removeCart=true;
       } else {
        this.removeCart=false;
       }
        })
      }
      
      
      
    })
  
  }


    handleQuantity(val: string){
      if( this.productQuantity <20 && val==='plus') {
        this.productQuantity += 1;
      }else if( this.productQuantity >1 && val==='min'){
        this.productQuantity -= 1;
      }
    }

    addToCart(){
      // if(this.productData){
      //   this.productData.quantity = this.productQuantity
      //   console.log(this.productData);
      //   if(!localStorage.getItem('user')){   //adding in cart without user logged in
      //     this.product.localAddToCart(this.productData);
      //     console.log(this.productData);
      //     this.removeCart=true
      //   }
      //   else{
      //     console.log('when user is logged in');
      //     let user = localStorage.getItem( 'user' );
      //     let userId = user && JSON.parse( user ).id;
      //     let cartData: cart={ ...this.productData,productId: this.productData.id ,userId };
      //     delete cartData.id;
      //     console.log(cartData)
      //     this.product.addToCart(cartData).subscribe((result)=>{
      //       if(result){ console.log("product added to cart successfully!")}
      //     });
      //   }
      // }

      if(this.productData){
        this.productData.quantity = this.productQuantity;
        if(!localStorage.getItem('user')){
          this.product.localAddToCart(this.productData);
          this.removeCart=true
        }else{
          let user = localStorage.getItem('user');
          let userId= user && JSON.parse(user).body[0].id;
          console.log("add to data checking userID", userId)
          let cartData:cart={
            ...this.productData,
            productId:this.productData.id,
            userId
          }
          delete cartData.id;
          this.product.addToCart(cartData).subscribe((result)=>{
            if(result){
             this.product.getCartList(userId);
             this.removeCart=true
            }
          })        
        }
        
      } 
    }
    removeToCart(productId:number){
      if(!localStorage.getItem('user')){
        this.product.removeItemFromCart(productId)
            }else{
              console.warn("cartData", this.cartData);
              
              this.cartData && this.product.removeToCart(this.cartData.id)
              .subscribe((result)=>{
                let user = localStorage.getItem('user');
                let userId= user && JSON.parse(user).body[0].id;
                console.log("removecrat data checking userID", userId)
               this.product.getCartList(userId)
              })
            }
      this.removeCart=false;

    }
}
