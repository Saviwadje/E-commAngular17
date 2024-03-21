import { EventEmitter, Injectable } from '@angular/core';
import { login, product, signUp } from '../datatype';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  invalidUserAuth= new EventEmitter<boolean>(false)
  constructor( private http: HttpClient, private router: Router) { }

  userSignUp(user:signUp){
    this.http.post('http://localhost:3000/users',user,{observe:'response'})
    .subscribe((result)=>{
     if(result){
       localStorage.setItem('user',JSON.stringify(result));
       this.router.navigate(['/user-auth']);
     }
     
    })
}

userLogin(data:login){
  this.http.get<signUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
  {observe:'response'}
  ).subscribe((result)=>{
    if(result && result.body?.length){
      localStorage.setItem('user',JSON.stringify(result));
      this.router.navigate(['/']);
       this.invalidUserAuth.emit(false)
    }else{
       this.invalidUserAuth.emit(true)
    }
  })
}



userauthReload(){
  if(localStorage.getItem('user')){
    this.router.navigate(['/'])
  }
}

}
