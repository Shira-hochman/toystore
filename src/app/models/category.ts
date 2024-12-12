export class Category{
    categoryId:number;
    categoryName :string;
    selected?: boolean; 

constructor(categoryId:number, categoryName :string,selected:boolean){
    this.categoryId=categoryId;
    this.categoryName=categoryName;
    this.selected=false
}
    
    
}