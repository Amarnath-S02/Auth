

import bcrypt from 'bcryptjs'
import User from '../model/user.model.js'
import jwt from "jsonwebtoken"

export const signUp=(async (req,res)=>{

    const{username,email,password}=req.body;
  try{

  
    if(!username || !email || !password){
       return res.status(400).json("All fields arre Required");
    }

    const hasedPassword=await bcrypt.hash(password,10);

    const user= new User({username,email,password:hasedPassword})
     
    await user.save();

    return res.status(201).json("User Rergistraion Successful");

}
catch(e){
  return   res.status(400).json(e.message);
}

});

export const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json("User doesn't have an account");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).json("Password is wrong");
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // include username (and maybe email too)
    return res.status(200).json({
      token,
      username: user.username, // <-- sending back username
      email: user.email,
      message: "User logged in successfully",
    });
  } catch (e) {
    return res.status(400).json(e.message);
  }
};
