import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order, product } from '../datatype';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData = new EventEmitter<product[] | []>();

  constructor(private http: HttpClient, private route: Router) { }

  addProducts(data: product){
    return this.http.post('http://localhost:3000/products', data);
  }

  productList() {
    return this.http.get<product[]>('http://localhost:3000/products');// this api will return product type data
  }

  deleteproduct(id: number){
    return this.http.delete('http://localhost:3000/products/' + id);
  }

getProduct(id: string){
    return this.http.get('http://localhost:3000/products/' + id);
  }

  updateProduct(product: product) {
    return this.http.put<product>(
      'http://localhost:3000/products/' + product.id, product
    );
  }

  popularProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');
  }

  trendyProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }


  searchProduct(query: string) {
    console.log(query)
    return this.http.get<product[]>( `http://localhost:3000/products?name_like=`+ query);
   // return this.http.get<product[]>( `http://localhost:3000/products?q=${query}`);
  }

  localAddToCart(data: product){
   let cartData=[];
    let localCart = localStorage.getItem('localCart')
    if (!localCart) {
    localStorage.setItem('localCart', JSON.stringify([data]))
    this.cartData.emit([data]);
  }
    else{
      cartData = JSON.parse(localCart)
      cartData.push(data)
      localStorage.setItem('localCart', JSON.stringify(cartData))
    }
    this.cartData.emit(cartData);
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  
  addToCart(cartData: cart) {
   // this.cartData.emit(cartData);
    return this.http.post('http://localhost:3000/cart', cartData);
    
  }

  removeToCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }

  getCartList(userId: number) {
    console.log("userid",userId)
    return this.http
      .get<product[]>('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        console.log(result.body);
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }

  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore).body[0];
    return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + userData.id);
  }

  orderNow(data: order) {
    return this.http.post('http://localhost:3000/orders', data);
  }


  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore).body[0];
    return this.http.get<order[]>('http://localhost:3000/orders?userId=' + userData.id);
  }

  deleteCartItems(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId).subscribe((result) => {
      this.cartData.emit([]);
      console.log("clearing cart", this.cartData)
    })
  }
  
  cancelOrder(orderId:number){
    return this.http.delete('http://localhost:3000/orders/'+orderId)

  }

}
  

