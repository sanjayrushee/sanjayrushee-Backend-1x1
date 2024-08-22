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


app.post("/saveuser/",async(request,response) =>{
  const {name,student_id,phonenumber,area_of_interest,eamil,availability,mentor_name,mentor_availability} = request.body

  const getUser = `SELECT * FROM student WHERE name = ? AND slot_booked = 'yes' AND student_id = ? ;`;
  const checktheUser = await database.get(getUser, [name,student_id]);

  if (checktheUser) {
      console.log('User has already booked a slot');
      return response.status(400).json({ message: "User has already booked a slot" });
  } else {
      const setStudent = `INSERT INTO student VALUES('${student_id}','${name}','${availability}','${area_of_interest}','${phonenumber}','${eamil}','yes');`
      const setMentor = 'UPDATE mentor SET mentor_availability = ? WHERE mentor_name = ?;'

      await database.run(setStudent)
      await database.run(setMentor,[mentor_availability,mentor_name])
      console.log("user added")
      return response.status(201).json({ message: "user added" });

  }

});


app.post("/booking/",async(request,response) =>{
  const {booking_id,student_id,mentor_availability,mentor_id} = request.body
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
  const getmentors = `SELECT * FROM mentor WHERE area_of_expertise = ? ORDER BY feedback ASC;`
  const mentorDetails = await database.all(getmentors,[area_of_expertise])
  console.log(mentorDetails)
  return response.status(200).send(mentorDetails)
}
catch(error){
  console.error(error)
  return response.status(400).json({message: "failed"})
}
});