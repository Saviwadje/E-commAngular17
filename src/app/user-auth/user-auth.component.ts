import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { cart, login, product, signUp } from '../datatype';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.scss'
})
export class UserAuthComponent {

  showLogin:boolean= true;
  authError:string="";
  constructor( private user: UserService, private product: ProductService){
  }

  signUp(data : signUp){
    this.user.userSignUp(data);
  }
  openSignUp(){
    this.showLogin=false
  }
  openLogin(){
this.showLogin=true;
  }

  login(data: login){
    this.user.userLogin(data);
    
    this.user.invalidUserAuth.subscribe((result)=>{
      console.warn(result);
      if(result){
         this.authError="User not found"
      }else{
         this.localCartToRemoteCart();
      }
      
    })
   
  }

  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userData = user && JSON.parse(user);
    console.log("user id", userData.body[0] );
    let userId =userData.body[0].id;
    //let userId= user && JSON.parse(user).id;
    if(data){
     let cartDataList:product[]= JSON.parse(data);
   
     cartDataList.forEach((product:product, index)=>{
       let cartData:cart={
         ...product,
         productId:product.id,
         userId: userId
       }
       delete cartData.id;
       console.log(cartData)
       console.log(cartData.id)
       console.log(cartData.userId)
       setTimeout(() => {
         this.product.addToCart(cartData).subscribe((result)=>{
           if(result){
             console.warn("data is stored in DB");
           }
         })
       }, 500);
       if(cartDataList.length===index+1){
        console.log("removing localcart")
         localStorage.removeItem('localCart')
       }
     })
    }
    setTimeout(() => {
      this.product.getCartList(userId)
     }, 2000);
      
    
  }
  
}
