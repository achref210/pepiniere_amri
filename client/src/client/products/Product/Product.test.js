//const {capitalize} = require('./Paie')
import { findMin, findMax, nearby, calculateQuantity } from "./Product"

describe("this is for get Minimum age and Maximum price", () => {

       test("only one age and one price", () => {
              const table = findMin([{name:'Isimm',age:5,price:2},{name:'Isimm',age:3},{name:'Isimm',age:4}]);
              expect(table).toStrictEqual([5, 2]);
       })

       test("no price", () => {
        const table = findMin([{name:'Isimm',age:5},{name:'Isimm',age:3},{name:'Isimm',age:4}]);
        expect(table).toStrictEqual([100000, 100000]);
 })

 test("different ages and prices", () => {
    const table = findMin([{name:'Isimm',age:5,price:7},{name:'Isimm',age:3,price:4},{name:'Isimm',age:4,price:6}]);
    expect(table).toStrictEqual([3, 4]);
})

})

describe("this is for get Maximum age and Maximum price", () => {

    test("only one age and one price", () => {
           const table = findMax([{name:'Isimm',age:5,price:2},{name:'Isimm',age:3},{name:'Isimm',age:4}]);
           expect(table).toStrictEqual([5, 2]);
    })

    test("no price", () => {
        const table = findMax([{name:'Isimm',age:5},{name:'Isimm',age:3},{name:'Isimm',age:4}]);
        expect(table).toStrictEqual([0, 0]);
    })

    test("different ages and prices", () => {
        const table = findMax([{name:'Isimm',age:5,price:7},{name:'Isimm',age:3,price:4},{name:'Isimm',age:4,price:6}]);
        expect(table).toStrictEqual([5, 7]);
    })

})

describe("this is for get near age", () => {

    test("only one age and one price", () => {
           const table = nearby([{name:'Isimm',age:5,price:2,quantity:20},{name:'Isimm',age:3,quantity:20},{name:'Isimm',age:4,quantity:20}],1);
           expect(table).toStrictEqual([5,2,20]);
    })

    /*test("different ages and prices", () => {
        const table = nearby([{name:'Isimm',age:5,price:7},{name:'Isimm',age:3,price:4},{name:'Isimm',age:4,price:6}],1);
        expect(table).toStrictEqual([3,4]);
    })*/

})

describe("this is for calculate quantity", () => {

    test("all have same quantity", () => {
           const result = calculateQuantity([{name:'Isimm',age:5,price:2,quantity:20},{name:'Isimm',age:3,quantity:20},{name:'Isimm',age:4,quantity:20}],1);
           expect(result).toStrictEqual(60);
    })

    test("some rows have no quantity", () => {
        const result = calculateQuantity([{name:'Isimm',age:5,price:2},{name:'Isimm',age:3,quantity:15},{name:'Isimm',age:4,quantity:20}],1);
        expect(result).toStrictEqual(35);
 })

})

calculateQuantity