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
    name :'hello',student_id :123123,phonenumber: 3423434343,area_of_interest: 'bnoting',eamil: "b;oo@ga",availability: "78pm to 34pm"
};

register(newUser);