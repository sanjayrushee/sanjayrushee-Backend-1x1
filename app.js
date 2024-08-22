const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const { request } = require("http");


const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "database.db");

const initializeDbAndServer = async () => {
  try {
    const database = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3004, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (error) {
    console.log(`DB Error : ${error.message}`);
    process.exit(1);
  }
};
initializeDbAndServer();


app.post("/register",async(request,response) =>{
  
});