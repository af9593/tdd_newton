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

    describe('Inserting a new card', ()=>{
        let bankomat = new Bankomat();
        let card = new Card(new Account()); 
        
        test('Ask to create a new pincode' , () => {
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
        })
    })
})

describe('Entering pin code', () => {
    test('Entering a correct pincode', () => {
        
    })
    test('Entering an incorrect pincode less than trice', () => {

    })

    test('Entering an incorrect pincode three times', () => {

    })
})

describe('Withdrawing money', () => {
    test('machine balance is not empty', () => {

    })

    test('machine AND account balances are enough', () => {

    })

    test('machine balance is enough but not the account balance', () => {

    })

    test('account balance is enough but not the machine balance', () => {

    })
})

