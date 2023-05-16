const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

require('dotenv').config();


// Post method for update the data.
router.post('/signup',(req,res)=>{
    // res.send("This is signup page")
    const {fullname,email,dob,mobile_no,USAI_ID,User_face_id} = req.body;
    // res.send("client",req.body);
    // if(!fullname || !email || !dob || !mobile_no || !USAI_ID || !User_face_id){
        // return res.status(422).send({error:"please fill this "})
        // return res.send("please fill this");
        // return res.status(422).send({error: "Please fill this "});

    // }
    User.findOne({email:email})
    .then(async(savedUser) => {
            if(savedUser){
                // return res.status(422).send({error:"Invalid Credentials"})
                // res.send("Invalid Credentials");
                return res.status(422).send({error: "Invalid Credentials"});

            }
            const user = new User({
                fullname,
                email,
                dob,
                mobile_no,
                User_face_id,
                USAI_ID,
            })
            try{
                await user.save();
                // res.send({message:"User saved successfully"});
                const token = jwt.sign({_id:user._id},process.env.jwt_secret);
                res.send({token});

            }
            catch(err){
                return res.status(422).send({error:err.message});
            }
        }
    )
})

// Get method for fetch the data.
router.get('/data',async(req,res)=> {    
    try{
        const users = await User.find()
        res.json(users)
    }catch(err){
        res.send('Error'+err)
    }
})

// router.put('/:id',async(res,res)=>{
//     try{
//         // update data.
//         const user  = await User.findById(req.params.id);
//         res.json(user);

//     }catch(err){
//         res.send("Error"+err);
//     }
// })


router.post('/user',async(req,res)=>{
        try{
            const {email} = req.body;
            const foundData = await User.find({email}).exec();
            if(foundData && foundData.length!=0){
                res.json(foundData);
            }
            else{
                res.status(404).json({ message: 'Data not found' });
            }
        }   
        catch(err){
            res.send("Error"+err);
        }
})


module.exports = router;
