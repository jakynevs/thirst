import app from "./app";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(__dirname, '..', 'data.json')

// Function to load data into memory
const loadDataIntoMemory = () => {
    try {
        const dataString = fs.readFileSync(dataFilePath, 'utf8');
        app.locals.cachedData = JSON.parse(dataString);
    } catch (error) {
        console.error('Failed to load data into memory:', error);
        app.locals.cachedData = null;
    }
};

// Call loadDataIntoMemory before the server starts
loadDataIntoMemory();

const server = app.listen(app.get("port"), () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});

export default server;