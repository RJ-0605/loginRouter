const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDb = require('../users.json')
require('dotenv').config();


loginRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  /*
  //the code in the two lines below are the same as the code on line 9
  const email = request.body.email
  const password = request.body.password
  */

  const userFound = userDb.find(user => user.email === email)

  if (userFound) {

    //const passwordCorrect = await bcrypt.compare(password, userFound.password)
    if (password === userFound.password) {

      const jwtBody = {
        email: userFound.email,
        id: userFound.id
      }
      const token = jwt.sign(jwtBody, process.env.JWT_SECRET);
      response.status(200).send({ jwtToken: token, email: userFound.email });
    } else {
      response.status(404).send({ message: "Password is wrong" });
    }
  } else {
    response.status(404).send({ message: "No user with this email found" });
  }

})

module.exports = loginRouter;