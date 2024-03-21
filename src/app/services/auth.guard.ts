import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SellerService } from "./seller.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private sellerService: SellerService, private router: Router) {}

  canActivate() {
    // if (this.sellerService.isAuthenticated()) {
    //   console.log('login successful');
    //   return true;
    // } else {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    if(localStorage.getItem('seller')){
      return true;
    } else{ return false}

    let result = this.sellerService.isUserLoggedIn.subscribe(res=> {
      return res});
    console.log("auth", result)
    return result
  }
}