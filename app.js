const express = require("express");
const path = require("path");
const cors = require('cors');
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const dotenv = require('dotenv');


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const dbPath = path.join(__dirname, "database.db");
let database = null
const port = process.env.PORT || 8000;

const initializeDbAndServer = async () => {
  try {
     database = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(port, () => {
      console.log("Server Running at http://localhost:3005/");
    });
  } catch (error) {
    console.log(`DB Error : ${error.message}`);
    process.exit(1);
  }
};
initializeDbAndServer();


app.post("/saveuser/",async(request,response) =>{
  const {name,phonenumber,area_of_interest,email} = request.body

  try{
  const getUser = `SELECT * FROM students WHERE name = ? AND email = ? ;`;
  const checktheUser = await database.get(getUser, [name,email]);
  if (checktheUser) {
      console.log('User has already booked a slot');
      return response.status(400).json({ message: "User has already booked a slot" });
  } else {
      const setStudent = `INSERT INTO students(name, area_of_interest, phonenumber, email) VALUES('${name}','${area_of_interest}','${phonenumber}','${email}');`
      await database.run(setStudent)
      console.log(request.body)
      return response.status(201).json({ message: "user added" });
  }
  }
  catch(error){
    return response.status(500).json({message: error})
  }

});


app.post("/booking/",async(request,response) =>{
  const {booking_id,student_id,mentor_availability,duration,mentor_id} = request.body
    try{
      const setMentor = 'UPDATE mentor SET mentor_availability = ? WHERE mentor_id = ?;'
      await database.run(setMentor,[mentor_availability,mentor_id])
      const classbooking = `INSERT INTO booking VALUES(?,?,?);`
      await database.run(classbooking,[booking_id,student_id,mentor_id])
      return response.status(201).json({ message: "booked" });
    }
    catch (error){
      console.error(error)
      return response.status(500).json({message:error})
    }

});

app.get("/mentor/", async(request,response) =>{
  const {area_of_expertise} = request.query
try{
  const getmentors = `SELECT * FROM mentor WHERE area_of_expertise = ? ORDER BY feedback DESC;`
  const mentorDetails = await database.all(getmentors,[area_of_expertise])
  console.log(area_of_expertise)
  return response.status(200).send(mentorDetails)
}
catch(error){
  console.error(error)
  return response.status(400).json({message: error})
}
});