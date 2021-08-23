const inquirer = require("inquirer");
const fs = require('fs');
const generatePage = require('./src/page-template');


const promptUser = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter your Name:",
            validate: nameInput => {
                if (nameInput){
                    return true
                } else {
                    console.log("Please enter your name!");
                    return false;
                }
            }
        },
        {
            type:"input",
            name:"github",
            message:"Enter your GitHub username:",
            validate: githubInput => {
                if (githubInput){
                    return true
                } else {
                    console.log("Please enter your GitHub username!");
                    return false;
                }
            }
        },
        {
            type:"confirm",
            name:"confirmAbout",
            message:"Do you want an About section?",
            default: true
        },
        {
            type:"input",
            name:"about",
            message:"Provide information for the About section:",
            when: ({confirmAbout}) => {
                if (confirmAbout){
                    return true;
                } else{
                    return false;
                }
            }
        }
    ]);
};
// promptUser().then(answers=>console.log(answers));

// Prompt Project-Related Questions //
const promptProject = portfolioData  => {
    //if there is no portfolio projects array, create one //
    if (!portfolioData.projects){
  portfolioData.projects = [];
    };
  
    console.log(`
    =================
    Add a New Project
    =================
    `);
    return inquirer.prompt([
{
    type:"input",
    name:"name",
    message:"Enter the name of your project:",
    validate: nameInput => {
                if (nameInput){
                    return true
                } else {
                    console.log("Please enter your project name!");
                    return false;
                }
            }
},
{
    type:"input",
    name:"description",
    message:"Enter a description of the project:"
},
{
    type:"checkbox",
    name:"languages",
    message:"Which languages are used on this project? (Check all that apply)",
    choices:["Javascript","HTML","CSS","ES6","jQuery","Bootstrap","Node.js"]
},
{
    type:"input",
    name:"link",
    message:"Enter the GitHub link for the project. (Required):",
    validate: linkInput => {
                if (linkInput){
                    return true
                } else {
                    console.log("Please enter your GitHub link!");
                    return false;
                }
            }
},
{
    type:"confirm",
    name:"feature",
    message:"Would you like this project featured?",
    default: false
},
{
    type:"confirm",
    name:"confirmAddProject",
    message:"Would you like to add another project?",
    default: false
}
    ]).then(projectData => {
  portfolioData.projects.push(projectData);
  if (projectData.confirmAddProject) {
    return promptProject(portfolioData);
  } else {
    return portfolioData;
  }
});
};

//USER PROMPT FUNCTION CALL //
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    const pageHTML = generatePage(portfolioData);

    fs.writeFile('./index.html', pageHTML, err => {
    if (err) throw new Error(err);

   console.log('Page created! Check out index.html in this directory to see it!');
   });
  });




