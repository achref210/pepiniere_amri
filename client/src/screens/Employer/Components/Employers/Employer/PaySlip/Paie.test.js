//const {capitalize} = require('./Paie')
import { capitalize, getTotalSalary, format } from "./Paie"
import moment from 'moment';

describe("this is for capitalize a string", () => {

       test("", () => {
              const name = capitalize('Isimm');
              expect(name).toBe("Isimm");
       })

       test("", () => {
              const name = capitalize('isimm');
              expect(name).toBe("Isimm");
       })

       test("", () => {
              const name = capitalize('');
              expect(name).toBe("");
       })

})

describe("this is for count salary", () => {

       test("days salary", () => {
              //getTotalSalary(salary,coefficient,startDate,workEnd,absenceCoun)
              const salary = getTotalSalary(20,1,new Date("2022-05-29"),new Date("2022-05-31"),0);
              expect(salary).toBe(60);
       })

       test("a day salary", () => {
              //getTotalSalary(salary,coefficient,startDate,workEnd,absenceCoun)
              const salary = getTotalSalary(20,1,new Date("2022-05-31"),new Date("2022-05-31"),0);
              expect(salary).toBe(20);
       })

       test("no salary", () => {
              //getTotalSalary(salary,coefficient,startDate,workEnd,absenceCoun)
              const salary = getTotalSalary(20,1,new Date("2022-06-01"),new Date("2022-05-31"),0);
              expect(salary).toBe(0);
       })

       test("days salary widh one abscence", () => {
              //getTotalSalary(salary,coefficient,startDate,workEnd,absenceCoun)
              const salary = getTotalSalary(20,1,new Date("2022-05-29"),new Date("2022-05-31"),1);
              expect(salary).toBe(40);
       })

       test("days salary widh equal days abscence", () => {
              //getTotalSalary(salary,coefficient,startDate,workEnd,absenceCoun)
              const salary = getTotalSalary(20,1,new Date("2022-05-29"),new Date("2022-05-31"),3);
              expect(salary).toBe(0);
       })

       test("days salary with more days abscence", () => {
              //getTotalSalary(salary,coefficient,startDate,workEnd,absenceCoun)
              const salary = getTotalSalary(20,1,new Date("2022-05-29"),new Date("2022-05-31"),4);
              expect(salary).toBe(0);
       })

       test("a day salary", () => {
              //getTotalSalary(salary,coefficient,startDate,workEnd,absenceCoun)
              const salary = getTotalSalary(20,1,new Date("2022-05-31"),new Date("2022-05-31"),0);
              expect(salary).toBe(20);
       })
       
})

describe("this is for format date", () => {

       test("test without library", () => {
              const date = format(("2022-05-29"));
              expect(date).toBe("29-05-2022");
       })

       test("test with moment library", () => {
              const date = format(moment("05/29/2022"));
              expect(date).toBe("29-05-2022");
       })

       test("empty date", () => {
              const date = format((""));
              expect(date).toBe(format(new Date));
       })
       
})