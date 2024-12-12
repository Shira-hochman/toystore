export class Product {
    productId:number;
    productName:string;
    categoryId:number;
    companyId:number;
    description:string;
    price:number;
    age:number
    categoryName:string;
    image:string;
    showIcons:boolean= false;
    


    constructor(productId:number,productName:string,categoryId:number,companyId:number,description:string,price:number,age:number,categoryName:string ,image:string,showIcons: false){
        this.productId=productId;
        this.productName=productName;
        this.categoryId=categoryId;
        this.companyId=companyId;
        this.description=description;
        this.price=price;
        this.age=age;
        this.categoryName=categoryName;
        this.image=image;
        this.showIcons=showIcons

    }
}
