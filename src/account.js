module.exports = class Account{
    balance = 5000;
    
    withdraw(amount){
        if(this.balance >= amount){
            this.balance -= amount;
            return amount;
        }else{
            return 0;
        }
    }

    getBalance(){
        return this.balance;
    }

}