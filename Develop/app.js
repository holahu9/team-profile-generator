const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const team = []
function createManager(){

// An array containing questions for the users input
inquirer.prompt([
    {
        type:'input',
        name: 'manager_name',
        message: 'What is your Managers name?'

    }, 
    {
        type:`input`,
        name:'nameId',
        message:'What is your Managers Id?'


    },
    {
        type:'input',
        name:'email',
        message:'What is your Managers email address?', 

    },
    {
        type:'input',
        name:'officeNumber',
        message:'What is your Managers office number?' 
    }, 
])

.then(response =>{
const manager = new Manager(response.manager_name, response.nameId, response.email,response.officeNumber)
team.push(manager);
createEmployee()
}) 
}
function createEngineer(){
    // An array containing questions for the users input
    inquirer.prompt([
        {
            type:'input',
            name: 'Engineer_name',
            message: 'What is your Engineer name?'
    
        }, 
        {
            type:`input`,
            name:'EngineerId',
            message:'What is your Engineer Id?'
    
    
        },
        {
            type:'input',
            name:'email',
            message:'What is your Engineer email address?', 
    
        },
        {
            type:'input',
            name:'github',
            message:'What is your Engineers Github?' 
        }, 
    ])
    
    .then(response =>{
    const engineer = new Engineer(response.Engineer_name, response.EngineerId, response.email,response.github)
    team.push(engineer);
    createEmployee()
    }) 
    }

    function createIntern(){

        // An array containing questions for the users input
        inquirer.prompt([
            {
                type:'input',
                name: 'Intern_name',
                message: 'What is your interns name?'
        
            }, 
            {
                type:`input`,
                name:'InternId',
                message:'What is your intern Id?'
        
        
            },
            {
                type:'input',
                name:'email',
                message:'What is your intern email address?', 
        
            },
            {
                type:'input',
                name:'school',
                message:'What is your intern  school?' 
            }, 
        ])
        
        .then(response =>{
        const intern = new Intern(response.Intern_name, response.InternId, response.email,response.school)
        team.push(intern);
        createEmployee()
        }) 
        }

createManager()
function createEmployee(){
 inquirer.prompt([
         {
            type:'list',
            name: 'choice',
            message: 'What type of team member would you like to add?',
            choices:['Engineer','Intern','N/A']
        }])
        .then(response =>{
            switch(response.choice) {
                case 'Engineer':
               createEngineer()
                  break;
                case 'Intern':
                createIntern()
                  // code block
                  break;
                default:
                    buildTeam()
                  // code block
              }
        })
}


function buildTeam(){
 if(!fs.existsSync(OUTPUT_DIR)){
    fs.mkdirSync(OUTPUT_DIR)

 }
fs.writeFileSync(outputPath, render(team), 'utf-8')


}