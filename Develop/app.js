const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const myTeam = []; // create myTeam empty array
function createManager(){

// An array containing questions for the users input
inquirer.prompt([
    {
        type:'input',
        name: 'name',
        message: 'Enter your Manager name?',
        validate: input => {
            if (input === ''){
                return 'Enter at least one character.';
            } else {
                return true;
            }
        }

    }, 
    {
        type:`input`,
        name:'nameId',
        message:'Enter your Manager Id?',
        validate: input => {
            // Check entry is a number
            if (!isNaN(input)) {
                // Check entry is not an empty string
                if (!(input === "")) {
                    return true;
                }
                console.log("You must enter an ID number.");
            } else {
                console.log("Please enter a number for the ID!");
            }
        }


    },
    {
        type:'input',
        name:'email',
        message:'Enter your Manager email address?', 
        validate: input => {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input)){
                return true;
            } else {
                return 'Enter a valid email address';
            }
        }

    },
    {
        type:'input',
        name:'officeNumber',
        message:'Enter your Manager office number?', 
        validate: input => {
            // Check entry is a number
            if (!isNaN(input)) {
                // Check entry is not an empty string
                if (!(input === "")) {
                    return true;
                }
                console.log("You must enter an ID number.");
            } else {
                console.log("Please enter a number for the ID!");
            }
        }
    }, 
])

.then(response =>{
const manager = new Manager(response.name, response.nameId, response.email,response.officeNumber)
// Push manager object to myTeam array
myTeam.push(manager);
createEmployee()
}) 
}
function createEngineer(){
    // An array hold questions for the users input
    inquirer.prompt([
        {
            type:'input',
            name: 'name',
            message: 'Enter your Engineer name?',
            validate: input => {
                if (input === ''){
                    return 'Enter at least one character.';
                } else {
                    return true;
                }
            }
    
        }, 
        {
            type:`input`,
            name:'EngineerId',
            message:'Enter your Engineer Id?',
            validate: input => {
                // Check entry is a number
                if (!isNaN(input)) {
                    // Check entry is not an empty string
                    if (!(input === "")) {
                        return true;
                    }
                    console.log("You must enter an ID number.");
                } else {
                    console.log("Please enter a number for the ID!");
                }
            }
            
        },
        {
            type:'input',
            name:'email',
            message:'Enter your Engineer email address?', 
            validate: input => {
                if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input)){
                    return true;
                } else {
                    return 'Enter a valid email address';
                }
            }
    
        },
        {
            type:'input',
            name:'github',
            message:'Enter your Engineer Github?' 
        }, 
    ])
    
    .then(response =>{
    const engineer = new Engineer(response.name, response.EngineerId, response.email,response.github)
    myTeam.push(engineer); // Push engineer object to myTeam array
    createEmployee()
    }) 
    }

    function createIntern(){

        // An array containing questions for the users input
        inquirer.prompt([
            {
                type:'input',
                name: 'name',
                message: 'What is your interns name?',
                validate: input => {
                    if (input === ''){
                        return 'Enter at least one character.';
                    } else {
                        return true;
                    }
                }
        
            }, 
            {
                type:`input`,
                name:'InternId',
                message:'What is your intern Id?',
                validate: input => {
                    // Check entry is a number
                    if (!isNaN(input)) {
                        // Check entry is not an empty string
                        if (!(input === "")) {
                            return true;
                        }
                        console.log("You must enter an ID number.");
                    } else {
                        console.log("Please enter a number for the ID!");
                    }
                }
        
        
            },
            {
                type:'input',
                name:'email',
                message:'What is your intern email address?', 
                validate: input => {
                    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input)){
                        return true;
                    } else {
                        return 'Enter a valid email address';
                    }
                }
        
            },
            {
                type:'input',
                name:'school',
                message:'What is your intern school?' 
            }, 
        ])
        
        .then(response =>{
        const intern = new Intern(response.name, response.InternId, response.email,response.school)
        myTeam.push(intern); // Push intern object to myTeam array
        createEmployee()
        }) 
        }

createManager()
function createEmployee(){
 inquirer.prompt([
         {
            type:'list',
            name: 'choice',
            message: 'What type of myteam would you like to add ?',
            choices:['Engineer','Intern','N/A']
        }])
        .then(response =>{
            switch(response.choice) {
                case 'Engineer':
               createEngineer()
                  break;
                case 'Intern':
                createIntern()
                 
                  break;
                default:
                    writeNewFile()
                  
              }
        })
}


function writeNewFile(){
    // Check if the output directory already exists
 if(!fs.existsSync(OUTPUT_DIR)){
     // If doesn't exist, create the specified directory
    fs.mkdirSync(OUTPUT_DIR)

 }
  // Write out the html page
fs.writeFileSync(outputPath, render(myTeam), 'utf-8')


}