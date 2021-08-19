const profileDataArgs = process.argv.slice(2, process.argv.length);


const printProfileData = profileDataArr => {
    // This ...
    for (let i = 0; i < profileDataArr.length; i++) {
        console.log(profileDataArr[i]);
    }
    console.log("==========");
    //...is the same as This 
    profileDataArr.forEach(iteration => console.log(iteration));
};

printProfileData(profileDataArgs);