const inquirer = require('inquirer');
const fs = require('fs');
var engineer_list = [];
var intern_list = [];
var engineer_num = -1;
var intern_num = -1;

var endingHTML = `    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>
</html>`

class Manager {
    constructor(name, id, email, office_num) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.office_num = office_num;
    }
    static managerPrompt() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: "Enter the team manager's name",
            },
            {
                type: 'input',
                name: 'id',
                message: "Enter the team manager's employee ID",
            },
            {
                type: 'input',
                name: 'office_num',
                message: "Enter the team manager's office number",
            },
            {
                type: 'input',
                name: 'email',
                message: "Enter the team manager's email",
            },

        ]).then((data) => {
            const manager = new Manager(data.name, data.id, data.email, data.office_num);
            var manager_card = `<div class="card" style="width: 18rem;">
<div class="card-header">
    ${manager.name}
    <img src="images/download.jpeg" alt="Manager">
</div>
<ul class="list-group list-group-flush">
  <li class="list-group-item">${manager.id}</li>
  <li class="list-group-item">${manager.email}</li>
  <li class="list-group-item">${manager.office_num}</li>
</ul>
</div>`
            createHTML += manager_card;
            Manager.options()
        });
    }
    static options() {
        inquirer.prompt([
            {
                type: 'rawlist',
                message: 'Pick one',
                name: 'choice',
                choices: ['Add an engineer', 'Add an intern', 'Finish building team'],
            },
        ]).then((data) => {
            if (data.choice === 'Finish building team') {
                createHTML += endingHTML;
                return fs.writeFileSync('index.html', createHTML)


            }
            else if (data.choice === 'Add an engineer') {
                engineerPrompt();
            }
            else if (data.choice === 'Add an intern') {
                internPrompt();
            }

        })
    }

}

const engineerPrompt = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Enter the engineer's name",
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter the team engineer's id",
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter the team engineer's email",
        },
        {
            type: 'input',
            name: 'github',
            message: "Enter the team engineer's  GitHub username",
        },
    ]).then((info) => {
        const engineer = new Engineer(info.name, info.id, info.email, info.github);
        engineer_list.push(engineer);
        engineer_num += 1;
        var engineer_card = ` <div class="card" style="width: 18rem;">
<div class="card-header">
    ${engineer_list[engineer_num].name}
    <img src="images/engineer.jpeg" alt="Manager">
</div>
<ul class="list-group list-group-flush">
  <li class="list-group-item">${engineer_list[engineer_num].id}</li>
  <li class="list-group-item"> <a href="mailto:${engineer_list[engineer_num].email}">${engineer_list[engineer_num].email}</a></li>
  <li class="list-group-item">
    <a href="${engineer_list[engineer_num].github}" target="_blank">${engineer_list[engineer_num].name}'s github</a></li>
</ul>
</div>`
        createHTML += engineer_card;
        Manager.options();


    })
}
class Engineer {
    constructor(name, id, email, github) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.github = 'https://github.com/' + github;
    }
}
const internPrompt = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Enter the intern's name",
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter the team intern's id",
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter the team intern's email",
        },
        {
            type: 'input',
            name: 'school',
            message: "Enter the team intern's  school",
        },
    ]).then((info) => {
        const intern = new Intern(info.name, info.id, info.email, info.school);
        intern_list.push(intern);
        intern_num += 1;
        var intern_card = ` <div class="card" style="width: 18rem;">
<div class="card-header">
    ${intern_list[intern_num].name}
    <img src="images/intern.jpeg" alt="Manager">
</div>
<ul class="list-group list-group-flush">
  <li class="list-group-item">${intern_list[intern_num].id}</li>
  <li class="list-group-item">${intern_list[intern_num].email}</li>
  <li class="list-group-item">${intern_list[intern_num].college} </li>
</ul>
</div>
`
        createHTML += intern_card;
        Manager.options();


    })
}
class Intern {
    constructor(name, id, email, school) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.school = school;
    }
}


var createHTML =


    `
 <!doctype html>
 <html lang="en">
   <head>
 
     <meta charset="utf-8">
     <meta name="viewport" content="width=device-width, initial-scale=1">
 
     <link rel="stylesheet" href= "/css/styles.css">
     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    
     <title>My Team</title>
   </head>
   <body>
     <nav class="navbar navbar-light bg-light">
         <div class="container-fluid">
           <span class="navbar-brand mb-0 h1">My Team</span>
         </div>
       </nav>
`



const init = () => {
    Manager.managerPrompt()
}


init()
