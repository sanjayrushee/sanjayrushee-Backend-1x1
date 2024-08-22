const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");


const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "database.db");
let database = null

const initializeDbAndServer = async () => {
  try {
     database = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3004, () => {
      console.log("Server Running at http://localhost:3004/");
    });
  } catch (error) {
    console.log(`DB Error : ${error.message}`);
    process.exit(1);
  }
};
initializeDbAndServer();


app.post("/register/",async(request,response) =>{
  const {name,student_id,phonenumber,area_of_interest,eamil,availability,mentor_name,slot_one} = request.body

  const getUser = `SELECT * FROM student WHERE name = ? AND slot_booked = 'yes';`;
  const checktheUser = await database.get(getUser, [name]);

  if (checktheUser) {
      console.log('User has already booked a slot');
      return response.status(400).json({ message: "User has already booked a slot" });
  } else {
      const setStudent = `INSERT INTO student VALUES('${student_id}','${name}','${availability}','${area_of_interest}','${phonenumber}','${eamil}','yes');`
      const setMentor = 'INSERT INTO mentor VALUES'
      await database.run(setStudent)
      console.log("user added")
  }

});