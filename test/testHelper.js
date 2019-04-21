const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Ticket = require('../models/Ticket');
const mongoose = require('mongoose');

const createUserAccount = ()=>{
    // Creating a fake user
    userId = new mongoose.Types.ObjectId();

    userB = {
      _id: userId,
      name: "Yi Jie",
      email: "seeyijie.74@gmail.com",
      contact: "91234567",
      isAdmin: false,
      password: "MEWMEWMEW"
    }

    ticket = {
      userId: userId,
      name: "Yi Jie",
      email: "seeyijie.74@gmail.com",
      content: "Hello,I would like to find out more about the API for chat bots and databases for a new project.Regards,Tom Lee",
      label: "API Demo Service",
      status: "new"
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

    Ticket.create(ticket)
      .then(res=>{
        console.log("Non-admin account: Ticket created")
      })
      .catch(err=>console.log(err));
}

const createAdminAccount = ()=>{
    // Creating a fake user
    userId = new mongoose.Types.ObjectId();


    userC = {
      _id: userId,
      name: "Tom Lee",
      email: "cyberform.jys@gmail.com",
      contact: "91234567",
      isAdmin: true,
      password: "MEWMEWMEW"
    }

    ticket = {
      userId: userId,
      name: "Tom Lee",
      email: "cyberform.jys@gmail.com",
      content: "Chatbot API is down since 7am GMT+8.",
      label: "Report Bug",
      status: "new"
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

    Ticket.create(ticket)
      .then(res=>{
        console.log("Admin account: Ticket created")
      })
      .catch(err=>console.log(err));
}


module.exports = {
    createUserAccount, 
    createAdminAccount
};
