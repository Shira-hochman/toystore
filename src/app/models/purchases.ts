export class Purchases {
    purchaseId:number;
    customerId :number;
    purchaseDate:Date;
    note:string
    totalAmount:number
    constructor(purchaseId:number,customerId :number,purchaseDate:Date,note:string,totalAmount:number){
        this.purchaseId=purchaseId;
        this.customerId=customerId;
        this.note=note;
        this.purchaseDate=purchaseDate
        this.totalAmount=totalAmount
    }
}
