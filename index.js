const http = require("http");

// Initialized dotEnv to use local .env file
const dotEnv = require("dotenv");
dotEnv.config();

const app = require("./app");
const server = http.createServer(app);

// Get port from local .env file or 3333
const port = process.env.PORT || 3333;

server.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});