import { Component, OnInit } from '@angular/core';
import { AppModule } from '../app.module';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../datatype';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet,  RouterLink],
  providers: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  menuType: String = "default";
  sellerName:string="";
  userName:string="";
  searchResult : undefined| product[];
  cartItem: number= 0;
  constructor( private route: Router, private product: ProductService){ }

  
  ngOnInit(){
    this.route.events.subscribe((val:any)=>{
      console.log(val.url)
      if(val.url){
        if (localStorage.getItem('seller') || val.url.includes('seller-home')){
          console.log("inside seller")
          this.menuType ="seller"
         let sellerStore=localStorage.getItem('seller');
         let sellerData = sellerStore && JSON.parse(sellerStore);
         console.log("sellerData", sellerData.body[0] );
         this.sellerName=sellerData.body[0].name;
          console.log(this.sellerName)
        } else  if (localStorage.getItem('user') ){
          console.log("inside user")
          this.menuType ="user"
         let userStore=localStorage.getItem('user');
         let userData = userStore && JSON.parse(userStore);
         console.log("userData", userData.body[0] );
         this.userName=userData.body[0].name;
         console.log(this.userName);
         this.product.getCartList(userData.body[0].id)
        } 
        else{ 
          this.menuType= "default"
          console.log("outside seller")
        }

      }
    });

    let carData= localStorage.getItem( 'localCart');
    if(carData){
      this.cartItem = JSON.parse(carData).length
    }
    this.product.cartData.subscribe(items=>{
      this.cartItem= items.length
    })
  }

  logout(){
    localStorage.removeItem('seller')
    this.menuType= "default"
  }
  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth'])
  }

  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result)=>{
       
        if(result.length>5){
          result.length=length
        }
        this.searchResult=result;
      })
    }
  }


    hideSearch(){
      this.searchResult=undefined
    }
    redirectToDetails(id:number){
      this.route.navigate(['/details/'+id])
    }
    submitSearch(val:string){
      console.warn(val)
    this.route.navigate([`search/`+val]);
    }
  


}
