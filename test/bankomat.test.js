const { expect, test } = require('@jest/globals');
const Bankomat = require("../src/bankomat.js");
const Account = require("../src/account.js");
const Card = require("../src/card.js");

describe('Inserting card', () => {

    test('Insert Card', () => {
        let bankomat = new Bankomat()
        let card = new Card(new Account()); 

        bankomat.insertCard(card)
        expect(bankomat.cardInserted).toBe(true);
        expect(bankomat.card).toBeDefined()
        expect(bankomat.getMessage()).toBe("Card inserted")
        // bankomat.ejectCard(); Kan man använda metoden om den inte är testad ??? 
    })

    describe('Inserting a card', ()=>{
        let bankomat = new Bankomat();
        let card = new Card(new Account()); 
        
        test('Inserting a new card' , () => {
            bankomat.insertCard(card); 
            expect(bankomat.card.pin).toBeUndefined();     
            expect(card.pin).toBeUndefined()
            expect(bankomat.getMessage()).toBe("Card inserted")
            expect(bankomat.getMessage()).toBe("Create a new pincode")

        })

        test('Create a new pincode' , () => {
            let newPincode = "1234"
            bankomat.enterPin(newPincode)
            expect(bankomat.card.pin).toBe(newPincode)
            expect(card.pin).toBe(newPincode)
            expect(bankomat.getMessage()).toBe("Your card is now setup and ready to use")
        })
    })
})

describe('Entering pin code', () => {

    let bankomat = new Bankomat();
    let card = new Card(new Account()); 
    card.pin = "1111"; // Mock  ?
    bankomat.insertCard(card); 
    bankomat.getMessage()
    
    test('Entering a correct pincode', () => {
        expect(bankomat.enterPin("1111")).toBe(true);
        expect(bankomat.getMessage()).toBe("Correct pin")
        expect(bankomat.pinAttempts).toBe(0); 
    })

    test('Entering an incorrect pincode less than trice', () => {
        expect(bankomat.pinAttempts).toBeLessThan(3); 
        expect(bankomat.enterPin("0000")).toBe(false);
        expect(bankomat.getMessage()).toBe("Incorrect pin")
    })

    test('Entering an incorrect pincode three times', () => {
        bankomat.enterPin("0000") //pinAttempts = 2
        
        expect(bankomat.enterPin("0000")).toBe(false)

        bankomat.getMessage()
        bankomat.getMessage()

        expect(bankomat.pinAttempts).toBe(3); 
        expect(bankomat.cardInserted).toBe(false); 
        expect(bankomat.getMessage()).toBe("Card kept. Contact your bank.")

        
    })
})

describe('Withdrawing money', () => {
    let bankomat = new Bankomat(); //machineBalance = 11000
    let card = new Card(new Account());  
    card.pin = "1111" ;
    bankomat.insertCard(card); 
    bankomat.getMessage()

    test('machine balance is not empty', () => {
        expect(bankomat.checkMachineBalance()).toBe(true)
        expect(bankomat.getMessage()).toBe("Enter amount to withdraw.")
    })

    test('machine AND account balances are enough', () => {
        let ammount = 2000; 
        let originalMachineBalance = bankomat.machineBalance
        expect(bankomat.withdraw(ammount)).toBe(ammount)
        expect(bankomat.machineBalance).toEqual((originalMachineBalance - ammount)) 
        expect(bankomat.getMessage()).toBe("Withdrawing " + ammount)
        //machineBalance = 9000
        // accountBalance = 3000
    })

    test('machine balance is enough but not the account balance', () => {
        let ammount = 4000; 
        expect(bankomat.withdraw(ammount)).toBe(0)
        expect(bankomat.getMessage()).toBe("Card has insufficient funds")
        //machineBalance = 9000
        // accountBalance = 3000
    })

    test('machine balance is not enough', () => {
        let ammount = 10000; 
        expect(bankomat.withdraw(ammount)).toBe(0)
        expect(bankomat.getMessage()).toBe("Machine has insufficient funds")
    })
})

