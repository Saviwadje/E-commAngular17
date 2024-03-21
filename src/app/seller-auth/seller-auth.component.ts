import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { login, signUp } from '../datatype';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  providers: [SellerService, Router],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.scss'
})
export class SellerAuthComponent {
  authError: string = ' ';

  constructor(private seller: SellerService, private route: Router) { } 
 showLogin: boolean=false;
 
  ngOnInit(){
    this.seller.reload();
  }

 signUp(data:signUp){
  this.seller.userSignup(data);

 }

 login(data:login){
  console.log(data)
  this.seller.userLogin(data);
 }

 openLogin(){
   this.showLogin =true;
   this.seller.isLoginError.subscribe(isError=>{
   if(isError) {this.authError= "Email or password is incorrect!"}
   })
 }

 openSignUp(){
  this.showLogin = false
 }

}
