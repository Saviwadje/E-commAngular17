import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { signUp } from '../datatype';
import { login } from '../datatype';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
 

 // isUserLoggedIn = new BehaviorSubject<boolean>(false); 
   isUserLoggedIn = new BehaviorSubject<boolean>(false);
   isLoginError= new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private route: Router) { }
  
  userSignup(data: signUp){
  
    this.http.post('http://localhost:3000/seller',
    data).subscribe((result)=>{
      console.warn("result",result);

      this.isUserLoggedIn.next(true);
      localStorage.setItem('seller', JSON.stringify(result)); 
      // const helper = new JwtHelperService();
      // let token = helper.tokenGetter()   
      // localStorage.setItem('authToken', 'token');
      // ;
      // console.log("result====", result)
      
      this.route.navigate(['/seller-home']);
    
   });
  }

  reload(){
    if(localStorage.getItem('seller')){
      this.isUserLoggedIn.next(true);
      this.route.navigate(['/seller-home']);
    }
  }

  userLogin(data: login){
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
   {observe:'response'}).subscribe((result:any)=>{
    console.warn("result",result)

    if(result && result.body && result.body.length===1){
        console.log("login done")
        localStorage.setItem('seller', JSON.stringify(result)); 
         this.route.navigate(['/']);
    }
    else{ 
      this.isLoginError.emit(true)
      console.log("login failed")
  }
});
   return 
  }

  // public isAuthenticated() : boolean {
  //   const token = localStorage.getItem('authToken');
  //   const helper = new JwtHelperService();
  //   const isExpired = helper.isTokenExpired(token);
  //   return !isExpired;
  // }
}
