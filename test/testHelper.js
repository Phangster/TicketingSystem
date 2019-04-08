const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createUserAccount = async()=>{
    // Creating a fake user
    userB = {
      name: "Tom Lee",
      email: "seeyijie.74@gmail.com",
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
          // console.log(hash)
          User.create(userB)
            .then(res => {
              console.log("Non-admin account created: seeyijie.74@gmail.com")
              return res
            })
            .catch(err => console.log(err))
        });
  });  
}

const createAdminAccount = async ()=>{
    // Creating a fake user
    userC = {
      name: "Yi Jie",
      email: "cyberform.jys@gmail.com",
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
          // console.log(hash)
          User.create(userC)
            .then(res => {
              // console.log(res.body)
              console.log("Admin account created: cyberform.jys@gmail.com")
              return res
            })
            .catch(err => console.log(err))
  
      });
  });  
}


module.exports = {
    createUserAccount, 
    createAdminAccount
};