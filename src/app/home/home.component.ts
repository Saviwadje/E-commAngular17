import { Component } from '@angular/core';
import { product } from '../datatype';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  popularProducts:undefined|product[];
  trendyProducts:undefined | product[];
   constructor(private product:ProductService) {}
 
   ngOnInit(): void {
     this.product.popularProducts().subscribe((data)=>{
      console.log(data)
       this.popularProducts=data;
     })
 
     this.product.trendyProducts().subscribe((data)=>{
       this.trendyProducts=data;
     })
   }
}
