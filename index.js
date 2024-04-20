const express = require('express');
const app = express();
const cors = require('cors');
const {USER, EMPLOYEE} = require('./models/user');
app.use(cors());
app.use(express.json());
const check = require('./check');
const auth = require('./auth');
require('dotenv').config(); 
const PORT= process.env.PORT;
const bcrypt = require('bcrypt');
app.post('/sign', async (req, res)=>{
    const {firstName, lastName, email, password}= req.body;
    if(await USER.findOne({email: req.body.email})){
        return res.status(400).json({
            msg:"Email exist"
        }) 
    }
    const salt = 12;
    try{
        const hashed = await bcrypt.hash(password, salt);
       await USER.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password : hashed
       });
      return res.json({
        msg:"Success"
       })
    }catch(e){
    return res.json({
        msg: e
     })
    }
   
})
app.post('/login', async (req, res)=>{
    const {email, password}= req.body;
    let emailExist = await USER.findOne({email: email});
    if(!emailExist){
        return res.status(400).json({
            msg:"User not found!"
        })
    }else{
        
        let passowrdMatch = await bcrypt.compare(password, emailExist.password);
        if(passowrdMatch){
            let token = auth(emailExist);
            return res.status(200).json({  
                 token: token,
                 user: {email, password},
             })
        }else{
            return res.status(400).json({
                msg:"Password not matched!"
            })
        }
    }  
})
app.post('/create_user', check, async (req, res)=>{
    try{
        await EMPLOYEE.create({
            ...req.body,createdbyId: req.user.id
        })
       return res.status(201).json({
        msg:"created"
       })
    }catch(e){
        return res.status(400).json({
            msg: e
        })
    }
}) 

app.delete('/:id', async (req, res)=>{
  let id = req.params.id;
  await EMPLOYEE.findByIdAndDelete(id);
  res.json({
    msg:"Deleted"
  })
})
 
app.patch('/:id', async (req, res)=>{
    let id = req.params.id;
    await EMPLOYEE.findByIdAndUpdate(id, {...req.body});
    res.json({
        msg:"Updated"
    })
})

app.get('/get_user', check , async (req, res)=>{
   const data = await EMPLOYEE.find({createdbyId: req.user.id});
   res.status(200).json({ 
   data: data,
   name: req.user.name
   })
})
app.listen(PORT, console.log("Running on "+ PORT));