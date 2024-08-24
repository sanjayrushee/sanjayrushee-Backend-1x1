const axios = require('axios'); // In Node.js, or import axios from 'axios' in a frontend framework

// Function definition
const register = (userData) => {
    const url = 'http://localhost:3004/register/';
    
    axios.post(url, userData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
}

// Example usage
const newUser = {
    name :'dsfa',student_id :33434,phonenumber: 3423434343,area_of_interest: 'bnoting',eamil: "b;oo@ga",availability: "78pm to 34pm",
    mentor_availability:'noting',mentor_name:'Vikram Mehta'
};

//register(newUser);

// Function definition
const booking = (userData) => {
    const url = 'http://localhost:3004/booking/';
    
    axios.post(url, userData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
}

const newbooking = {
    booking_id: 2323,student_id:33434,mentor_availability:'bot',mentor_id:9
};

//booking(newbooking)

const mentor = (userData) => {
    const url = 'http://localhost:3004/mentor/';
    
    axios.get(url, {
        params: userData, // Pass the data as query parameters
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
}

const getmentor = {
    area_of_expertise: 'Consulting'
};

mentor(getmentor);
