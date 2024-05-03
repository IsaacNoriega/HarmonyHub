const axios = require('axios');
const { response } = require('express');
const jwt = require('jsonwebtoken');

function tokenToJson(){
  axios.get('/home/getToken').then(response =>{
    return response;
  }).catch(e =>{
    console.log('error al obtener token');
  })
}

function updateDashboard(){
  const userEmail = tokenToJson().email;
  axios.post('/home', {
    email : userEmail
  }).then(response =>{
    console.log(response);
  }).catch( e =>{
    console.log('Error', e);
  })
}


