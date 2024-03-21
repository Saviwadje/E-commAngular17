export interface signUp{
    name: String;
    password: String;
    email: String
}

export interface login{
    password: String;
    email: String
}

export interface product{
    id: number,
    name: String,
    price: number,
    category: String,
    color: String,
    description: String,
    image: String,
    quantity: undefined | number,
    productId: undefined| number
}


export interface cart{
    id: undefined| number,
    name: String,
    price: number,
    category: String,
    color: String,
    description: String,
    image: String,
    quantity: undefined | number,
    userId: number,
    productId: number
}

export interface priceSummary{

  price:number,
  discount:number,
  tax:number,
  delivery:number,
  total:number
}

export interface order {
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:string,
    id:number|undefined
  }