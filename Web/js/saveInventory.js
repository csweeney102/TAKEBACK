async function saveInventory() {
    console.log("saveInventory() has started.");

    const userId = sessionStorage.getItem("userId");
    const state = JSON.parse(sessionStorage.getItem("state") || "{}");

    console.log(" state contents:", state);

    if (!userId) {
        console.warn(" Missing user ID in sessionStorage.");
        return;
    }

    // List of inventory item keys
    const inventoryKeys = [
        'davidJobInfo',
        'divorceLetter',
        'gunKey',
        'gun',
        'manifesto'
    ];

    //Deletes existing inventory of user
    const deleteQuery = `DELETE FROM user_inventory WHERE userId = '${userId}';`;

    let deleteParams = new URLSearchParams(dbConfig);
    deleteParams.set("query", deleteQuery);

    try {
        let deleteResponse = await fetch(dbConnectorUrl, {
            method: "POST",
            body: deleteParams
        });

        let deleteResult = await deleteResponse.json();
        console.log("Cleared previous inventory:", deleteResult);
    } catch (error) {
        console.error("Error deleting inventory:", error);
        return; //stops here if delete fails
    }

    //Inserts current inventory items
    for (let key of inventoryKeys) {
        if (state[key] === true) {
            console.log(` Preparing to save: ${key}`);

            const insertQuery = `INSERT INTO user_inventory (userId, item_name)
                                 VALUES ('${userId}', '${key}');`;

            let insertParams = new URLSearchParams(dbConfig);
            insertParams.set("query", insertQuery);

            try {
                let response = await fetch(dbConnectorUrl, {
                    method: "POST",
                    body: insertParams
                });

                let result = await response.json();
                console.log(` DB result for "${key}":`, result);

                if (!result.success) {
                    console.error(` Failed to save item: ${key}`, result);
                }

                await new Promise(r => setTimeout(r, 50)); // short delay
            } catch (error) {
                console.error(`Error saving item: ${key}`, error);
            }
        }
    }

    console.log("Inventory saved to database for user ID:", userId);
}

// Load inventory function
async function loadInventory() {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
        console.warn("No user ID found in sessionStorage.");
        return;
    }

    const sqlQuery = `SELECT item_name FROM user_inventory WHERE userId = '${userId}';`;

    let loadParams = new URLSearchParams(dbConfig);
    loadParams.set("query", sqlQuery);

    try {
        let response = await fetch(dbConnectorUrl, {
            method: "POST",
            body: loadParams
        });

        let result = await response.json();

        if (!result.success || result.data.length === 0) {
            console.warn("No saved inventory found in DB.");
            return;
        }

        // Build a new state object from DB results
        let loadedState = {};
        for (let row of result.data) {
            loadedState[row.item_name] = true;
        }

        // Optionally merge with any existing session state
        const existingState = JSON.parse(sessionStorage.getItem("state") || "{}");
        const mergedState = { ...existingState, ...loadedState };

        // Save to sessionStorage
        sessionStorage.setItem("state", JSON.stringify(mergedState));

        console.log("Inventory loaded and updated in sessionStorage:", mergedState);
    } catch (error) {
        console.error("Error loading inventory from DB:", error);
    }
}

// Reset inventory function
async function resetInventory() {
    const userId = sessionStorage.getItem("userId");

    let deleteQuery = `DELETE FROM user_inventory WHERE userId = '${userId}';`;
    let params = new URLSearchParams(dbConfig);
    params.set("query", deleteQuery);

    try {
        const response = await fetch(dbConnectorUrl, {
            method: "POST",
            body: params
        });

        const result = await response.json();

        if (result.success) {
            console.log("Inventory cleared successfully for user:", userId);

            //Clears inventory from session storage
            let state = JSON.parse(sessionStorage.getItem("state") || "{}");

            //Looks for inventory items in the state and deletes them
            const inventoryKeys = ['davidJobInfo', 'divorceLetter', 'gunKey', 'gun', 'manifesto'];
            for (let key of inventoryKeys) {
                if (key in state) {
                    delete state[key];
                }
            }

            sessionStorage.setItem("state", JSON.stringify(state));
            console.log("Session state inventory cleared.");

        } else {
            console.error("Failed to clear inventory from DB:", result);
        }

    } catch (error) {
        console.error("Error while deleting inventory:", error);
    }
}