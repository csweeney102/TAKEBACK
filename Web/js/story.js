optionsBox = document.getElementById("optionsContainer");
textBox = document.getElementById("dialogueBox");
let currentPromptIndex = 0;
//let gunLoaded = 0;
//let currentState = JSON.parse(sessionStorage.getItem("state"));
//let choices = {};
//let currentBranchIndex = 0;
let currentBranchIndex = parseInt(sessionStorage.getItem("currentBranchIndex")) || 0;

let typewriterTimeout = null;

// Sets styles according to options selected
document.getElementById("wrapperStyle").style.fontSize = sessionStorage.getItem("tSize");
document.getElementById("wrapperStyle").style.color = sessionStorage.getItem("tColour");
document.getElementById("wrapperStyle").style.fontFamily = sessionStorage.getItem("tFont");
document.getElementById("wrapperStyle").style.backgroundColor = `rgba(0, 0, 0, ${sessionStorage.getItem("tBgOpacity")})`;

/**
 * TODO:
 *  - dynamic branching
 *  - timer based on difficulty
 *  - end game
 */

document.addEventListener("DOMContentLoaded", function () {
    //let currentBranchIndex = parseInt(sessionStorage.getItem("currentBranchIndex"));
    console.log(`Player Name: ${playerName}`);
    console.log(`Time Limit: ${sessionStorage.getItem("timeLimit")}`);
    console.log(currentBranchIndex);
    
    // Initialize state and choices if they don't exist
    if (!sessionStorage.getItem("state")) {
        sessionStorage.setItem("state", JSON.stringify({}));
    }
    
    if (!sessionStorage.getItem("choices")) {
        sessionStorage.setItem("choices", JSON.stringify({}));
    }
    
    // Initialize davidEmotion if it doesn't exist
    if (!sessionStorage.getItem("davidEmotion")) {
        sessionStorage.setItem("davidEmotion", "0");
    }
    
    displayPrompt(currentBranchIndex, currentPromptIndex);
});

function displayPrompt(branchIndex, promptIndex){
    // check to see if your at end of game
    if(currentBranchIndex >= branches.length){
        endGame();
        return;
    }
    //const branch = branches.find(branch => branch.id === branchIndex);
    let branch = branches[branchIndex];
    let specPrompt = (branch.prompt)[promptIndex];
    let len = (branch.prompt).length;
    //console.log(len);
    
    // Use typeText function instead of directly setting innerHTML
    typeText(specPrompt, textBox);

    // remove options from previous prompt
    while(optionsBox.firstChild){
        optionsBox.removeChild(optionsBox.firstChild);
    }
    
    
    // if theres more than one prompt then create a button to further the text. useful for conversation/dramatic pause lol
    if(promptIndex < len-1){
        continueButton(branchIndex, promptIndex);
    }

    // if this is the last prompt then display the options
    if(promptIndex === len-1){
        if(branch.options != null){ // if there are options to display (we can put an else here thatll take u to end game and results!!!)
            displayOptions(branchIndex);
        }
        //displayOptions(branchIndex);
    }
}

function displayOptions(branchIndex){
    let branch = branches[branchIndex];

    /*
    while(optionsBox.firstChild){
        optionsBox.removeChild(optionsBox.firstChild);
    }
    */
    /*
    for(option of branch.options){
        if (showOption(option)){
            const button = document.createElement('button');
            button.innerText = option.text;
            button.addEventListener('click', () => selectOption(option));
            //button.addEventListener("click", selectOption(option));
            optionsBox.appendChild(button);
        }
    }
    */
   branch.options.forEach(option => {
    if (showOption(option)){
        const button = document.createElement('button');
        button.innerText = option.text;
        button.addEventListener('click', () => selectOption(option));
        optionsBox.appendChild(button);
    }
   })
}

// show option will be for like when an option requires you to have a certain object in inventory
function showOption(option){
    let stateFulfilled = false;
    let choiceFulfilled = false;
    let davidAbovePass = false;
    let davidBelowPass = false;

    if(option.requiredState != null){
        let item = option.requiredState[0]; // the object to be considered
        let itemStatus = option.requiredState[1]; // whether option requires it to be true or false

        let state = JSON.parse(sessionStorage.getItem("state") || "{}");
        if(state[item] == itemStatus){
            stateFulfilled = true; // status of the item in session storage meets the status required, so state requirement fulfilled!
        }
    }

    if(option.requiredChoice != null){
        let choice = option.requiredChoice[0];
        let choiceStatus = option.requiredChoice[1];

        let choices = JSON.parse(sessionStorage.getItem("choices") || "{}");
        if(choices[choice] == choiceStatus){
            choiceFulfilled = true;
        }
    }

    if(option.davidEmotionAbove != null){
        let deRequired = option.davidEmotionAbove;
        let davidEmotion = parseInt(sessionStorage.getItem("davidEmotion") || "0");

        if(davidEmotion > deRequired){
            davidAbovePass = true;
        }
    }

    if(option.davidEmotionBelow != null){
        let deRequired = option.davidEmotionBelow;
        let davidEmotion = parseInt(sessionStorage.getItem("davidEmotion") || "0");

        if(davidEmotion < deRequired){
            davidBelowPass = true;
        }
    }

    if((option.requiredChoice == null || choiceFulfilled) &&
    (option.requiredState == null || stateFulfilled) &&
    (option.davidEmotionAbove == null || davidAbovePass) &&
    (option.davidEmotionBelow == null || davidBelowPass)){
        return true;
    }else{
        return false;
    }
    /*
    if(option.requiredChoice == null || choiceFulfilled){
        if(option.requiredState == null || stateFulfilled){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
    */
}

function selectOption(option){
    console.log(`target is ${option.targetIndex}`);
    //currentBranchIndex = option.targetIndex;
    sessionStorage.setItem("currentBranchIndex", option.targetIndex);
    currentBranchIndex = parseInt(sessionStorage.getItem("currentBranchIndex"));

    console.log(currentBranchIndex);
    if(option.goTo != null){
        window.location.href = `${option.goTo}`;
    }

    // Handle timeLost property to reduce available time
    if(option.timeLost != null) {
        let currentTime = parseInt(sessionStorage.getItem("timeLimit")) || 0;
        let newTime = Math.max(0, currentTime - option.timeLost);
        sessionStorage.setItem("timeLimit", newTime);
    }

    if(option.setState != null){
        //state[`${option.setState[0]}`] = option.setState[1];
        let changed = true;
        let state = JSON.parse(sessionStorage.getItem("state") || "{}");
        let itemStr = `${option.setState[0]}`; // the item that needs its status changed
        let changedStr = `${option.setState[1]}`; // the value to change it to
        if(changedStr == "false"){
            changed = false;
        }

        state[itemStr] = changed;

        sessionStorage.setItem("state", JSON.stringify(state));
        console.log(`state: ${sessionStorage.getItem("state")}`);
    }

    if(option.setChoices != null){
        //choices[`${option.setChoices[0]}`] = option.setChoices[1];
        // you cant really unmake a choice like how you can get rid of an item but im going to use the same method anyways just in case
        let changed = true;
        let choices = JSON.parse(sessionStorage.getItem("choices") || "{}");
        let choiceStr = `${option.setChoices[0]}`;
        let changedStr = `${option.setChoices[1]}`;
        if(changedStr == "false"){
            changed = false;
        }

        choices[choiceStr] = changed;

        sessionStorage.setItem("choices", JSON.stringify(choices));
        console.log(`choices: ${sessionStorage.getItem("choices")}`);
    }

    if(option.changeDavidEmotion != null){
        let davidEmotion = parseInt(sessionStorage.getItem("davidEmotion") || "0");
        davidEmotion += option.changeDavidEmotion;
        sessionStorage.setItem("davidEmotion", davidEmotion);
        console.log(`david emotion: ${sessionStorage.getItem("davidEmotion")}`);
    }

    if(option.changePromptIndex != null){
        displayPrompt(currentBranchIndex, option.changePromptIndex);
    }else{
        displayPrompt(currentBranchIndex, 0);
    }
}

function continueButton(branchIndex, promptIndex){
    let targetPromptIndex = promptIndex + 1;
    optionsBox.innerHTML = `<button onclick="displayPrompt(${branchIndex},${targetPromptIndex})">CONTINUE</button>`
}

function endGame() {
    console.log("Game over");
}

// Typewriter animation function
function typeText(text, element) {
    // Clear previous typewriter animation to prevent animation overlap
    if (typewriterTimeout) {
        clearTimeout(typewriterTimeout);
        typewriterTimeout = null;
    }
    
    let charIndex = 0;
    element.innerHTML = ''; // Clear any existing content
    
    function type() {
        if (charIndex < text.length) {
            element.innerHTML += text.charAt(charIndex);
            charIndex++;
            element.scrollTop = element.scrollHeight;
            typewriterTimeout = setTimeout(type, 25); // Store the timeout value
        } else {
            // When typing is complete, add a class for cursor effect if needed
            element.classList.add('typewriter');
            typewriterTimeout = null;
        }
    }
    
    type(); // Start typing
}

// Main save function
async function triggerSave() {
    console.log("🖱️ Save button clicked!");
    sessionStorage.setItem("currentPromptIndex", currentPromptIndex);
    
    await saveGame();
    await saveInventory();

    // Navigates to welcome page affter saving is done
    window.location.href = "welcome.html";
}