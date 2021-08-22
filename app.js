

const inquirer = require("inquirer");


const promptUser = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter your Name:"
        },
        {
            type:"input",
            name:"github",
            message:"Enter your GitHub username:"
        },
        {
            type:"input",
            name:"about",
            message:"Provide information for the About section:"
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
    message:"Enter the name of your project:"
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
    message:"Enter the GitHub link for the project. (Required):"
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
});;
};
promptUser()
.then(promptProject)
.then(portfolioData => {
    console.log(portfolioData);
});


// const fs = require('fs');
// const generatePage = require('./src/page-template.js');
// const pageHTML = generatePage(name, github);



// fs.writeFile('./index.html', generatePage(name, github), err => {
//     if (err) throw new Error(err);

//     console.log('Portfolio complete! Check out index.html to see the output!');
// });

