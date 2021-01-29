const Employee = require("./Employee")
// Code to define and export the Engineer class. 

class Manager extends Employee {

    constructor(name,id,email,officeNumber){
    super(name,id,email)
    this.officeNumber = officeNumber 
    }

    getOfficeNumber(){
    return this.officeNumber
    }

    getRole(){
     return `Manager`
    }

}

module.exports = Manager