import { Component, numberAttribute } from '@angular/core';
import { product } from '../datatype';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [ CommonModule,FontAwesomeModule, RouterLink ],
  providers:[Router],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.scss'
})
export class SellerHomeComponent {
  productList: undefined | product[];
  productMessage: undefined | string;
  icon = faTrash;
  iconEdit=faEdit;
  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.product.productList().subscribe((result) => {
      if (result) {
        this.productList = result;
      }
    });
  }


  deleteProduct(id: number){
    console.log("test id", id )
    this.product.deleteproduct(id).subscribe((result)=>{
      if(result){
        this.productMessage="Delete Successfully";
        console.log("deleted")
        this.list();
      }});

      setTimeout(()=>{
        this.productMessage= undefined
      }, 3000)

    }

  }

  
