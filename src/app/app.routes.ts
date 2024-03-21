import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { AuthGuard } from './services/auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SearchComponent } from './search/search.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';


export const routes: Routes = [

    {
        path: '',
        component: HomeComponent
    },

    {path: 'seller-auth',
    component: SellerAuthComponent
} ,
//    {
//     path: 'my-acc',
//     component: MyAccountComponent,
//     canActivate: [AuthGuard]
//    },
   {
    path: 'seller-add-product',
    component: SellerAddProductComponent
   },
   {
    path: 'seller-home',
    component: SellerHomeComponent,
    canActivate: [AuthGuard]
   },
   {
    path: 'seller-update/:id',
    component: SellerUpdateProductComponent,
    canActivate: [AuthGuard]
   },

   {
    component: SearchComponent,
    path:'search/:query'
  },
  {
    component:ProductDetailComponent,
    path:'details/:productId'
  },
  {
    component:UserAuthComponent,
    path:'user-auth'
  },
  {
    component: CartPageComponent,
    path: 'mycart'
  },

  {
    component: CheckoutComponent,
    path: 'checkout'
  },

  {
    component: MyOrdersComponent,
    path: 'my-orders'
  },


  
];
