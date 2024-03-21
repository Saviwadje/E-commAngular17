import { Component } from '@angular/core';
import { product } from '../datatype';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [  CommonModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  searchResult:undefined|product[]
  constructor(private activeRoute: ActivatedRoute, private product:ProductService) { }

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    console.log("search compnent",query);
    query && this.product.searchProduct(query).subscribe((result)=>{
        if (result){ 
          this.searchResult= result;}
      else{this.searchResult= undefined}
      
    })
    

  }
}
