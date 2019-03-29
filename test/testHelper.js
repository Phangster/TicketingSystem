const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createUserAccount = ()=>{
    // Creating a fake user
    userB = {
      name: "Tom Lee",
      email: "tomlee.abc@gmail.com",
      contact: "91234567",
      isAdmin: false,
      tickets: [
        {
          status: "new",
          content: "I want to have access to the API demo!",
          label:"API Demo Services"
        }
      ],
      password: "MEWMEWMEW"
    }
  
    // Encrypting the password and editing it
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(userB.password, salt, (err, hash)=>{
          if (err) throw err;
          userB.password = hash;
          console.log(hash)
          User.create(userB).then(res => console.log(res)).catch(err => console.log(err))
  
      });
  });  
}

const createAdminAccount = ()=>{
    // Creating a fake user
    userC = {
      name: "Jason Yi Jie",
      email: "seeyijie.74@gmail.com",
      contact: "91234567",
      isAdmin: true,
      tickets: [
        {
          status: "new",
          content: "I want to have access to the API demo!",
          label:"API Demo Services"
        }
      ],
      password: "MEWMEWMEW"
    }
  
    // Encrypting the password and editing it
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(userB.password, salt, (err, hash)=>{
          if (err) throw err;
          userC.password = hash;
          console.log(hash)
          User.create(userC)
            .then(res => console.log(res))
            .catch(err => console.log(err))
  
      });
  });  
}


module.exports = {
    createUserAccount, 
    createAdminAccount
};