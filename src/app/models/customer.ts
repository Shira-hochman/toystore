export class Customer {
    customerId :number;
    customerName :string;
    phone :string;
    email:string;
    birthDate :Date;
    constructor(customerId :number,customerName :string,phone :string,email:string,birthDate :Date){
        this.birthDate=birthDate;
        this.customerId=customerId;
        this.customerName=customerName;
        this.email=email;
        this.phone=phone;
        
    }
}

