const userId = sessionStorage.getItem("userId");
//const currentBranchIndex = sessionStorage.getItem("currentBranchIndex");
const webLocation = window.location.pathname.split("/").pop().replace(".html", "");
const difficulty = sessionStorage.getItem("difficulty") || "normal";
const playTime = parseInt(sessionStorage.getItem("timeLimit"));
//const inventoryItems = JSON.parse(sessionStorage.getItem("inventory")) || [];

// Saves a partially completed game to the database so it can be loaded later. 
async function saveGame() {
    clearInterval(timer);

    let sqlQuery = `INSERT INTO playerProgress (userId, currentBranchIndex, location, difficulty, playTime)
                     VALUES ('${userId}', '${currentBranchIndex}', '${webLocation}', '${difficulty}', ${playTime})
					 ON DUPLICATE KEY UPDATE
					 currentBranchIndex = VALUES(currentBranchIndex),
					 location = VALUES(location),
					 difficulty = VALUES(difficulty),
					 playTime = VALUES(playTime);`;
  
    console.log(sqlQuery);

    dbConfig.set('query', sqlQuery);
    try {
        let response = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        });
        let result = await response.json();

        if (result.success) {
            console.log("Game saved successfully!");
            //window.location.href = "welcome.html";
        } else {
            console.error("Error saving game.", result);
        }

    } catch {
        console.error("Error saving game:", error);
    }
}

// Resume game
async function resumeGame() {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
        alert("No saved game found. Please log in.");
        console.error("User ID is missing in sessionStorage.");
        return;
    }

    let sqlQuery = `SELECT * FROM playerProgress WHERE userId = '${userId}'`;

    console.log("Fetching progress with query:", sqlQuery);
    dbConfig.set('query', sqlQuery);

    try {
        let response = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        });
        let result = await response.json();

        if (!result.success || result.data.length === 0) {
            alert("No saved game found.");
            console.error("Error retrieving saved progress:", result);
            return;
        }

        let progress = result.data[0];

        // Restore session values
        sessionStorage.setItem("location", progress.location);
        sessionStorage.setItem("difficulty", progress.difficulty);
        sessionStorage.setItem("timeLimit", progress.playTime);

        sessionStorage.setItem("currentBranchIndex", progress.currentBranchIndex);

        await loadInventory();

        console.log("Resuming game at:", progress.location);

        // Redirect to last known location
        const savedLocation = sessionStorage.getItem("location");
        if (savedLocation) {
            window.location.href = `${savedLocation}.html`;
        } else {
            alert("Error: No saved location found. Redirecting to default.");
            window.location.href = "welcome.html";
        }
    } catch (error) {
        console.error("Error resuming game:", error);
    }

    
    
}

// Reset the save in the database
async function resetSave() {
	let sqlQuery = `DELETE FROM playerProgress WHERE userId = '${userId}';`;

	dbConfig.set('query', sqlQuery);
	try {
	    let response = await fetch(dbConnectorUrl, {
	        method: "POST",
	        body: dbConfig
	    });
	    
	    let result = await response.json();

        await resetInventory();
        
	    if (result.success) {
	        console.log("Player progress deleted successfully!");
	        window.location.href = "welcome.html";  // Redirect after successful deletion
	    } else {
	        console.error("Error deleting player progress.", result);
	    }

	} catch (error) {
	    console.error("Error deleting player progress:", error);
	}

    
}

// Delete the user's account
async function deleteAccount() {
	let sqlQuery = `DELETE FROM users WHERE userId = '${userId}';`;

	dbConfig.set('query', sqlQuery);
	try {
	    let response = await fetch(dbConnectorUrl, {
	        method: "POST",
	        body: dbConfig
	    });
	    
	    let result = await response.json();

	    if (result.success) {
	        console.log("User account deleted successfully!");
	        window.location.href = "login.html";  // Redirect after successful deletion
	    } else {
	        console.error("Error deleting user account.", result);
	    }

	} catch (error) {
	    console.error("Error deleting user account:", error);
	}
}
