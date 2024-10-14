const User = require('../models/User')
const bcrypt  = require('bcrypt')



// Signup Function
async function signup(req, res) {
    try {
        const { firstName,lastName, email, password, pincode, mobileNo, address1, address2, state, country, lastLogin, isLogin, confirmPassword } = req.body; 
        // const existingUser = await User.findOne({ email });
        // if (existingUser) {
        //     return res.status(400).json({ message: 'User already exists' });
        // }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
         const hashedPassword = await bcrypt.hash(password, 10);
         console.log(hashedPassword,'this is a hashedPassword');
        const fullName = `${firstName} ${lastName}`; //templete litral
        const user = new User({
            fullName,
            lastName,
            firstName,
            email,
            password : hashedPassword,
            pincode,
            mobileNo,
            address1,
            address2,
            state,
            country,
            lastLogin,
            isLogin
        });
        await user.save();

        console.log('New user registered:', user);
        res.status(201).json({ message: 'Signup successful', user });

    } catch (error) {
        console.error('Error during signup:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
   
}
async function login(req, res) {
       try {
        const  { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
                 return res.status(400).json({ message: 'User does not exists' });
             }
        if (existingUser) {
            const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
            if (!isPasswordMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
        }
        res.status(200).json({ message: 'Login successful', user: existingUser });
       } catch (error) {
        console.error('Error during signup:', error.message);
        res.status(500).json({ message: 'Internal server error' });
       } 
}
async function changePassword(req, res) {
    try {
        const  { oldPassword, newPassword } = req.body;
        const existingUser = await User.findOne({ _id: req.params.id });
        if (!existingUser) {
            return res.status(400).json({ message: 'User does not exists' });
        }
        const isPasswordMatch = await bcrypt.compare(oldPassword, existingUser.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid old password' });
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            existingUser.password = hashedPassword;
            await existingUser.save();
            res.status(200).json({ message: 'Password changed successfully' });


    } catch (error) {
        console.error('Error during signup:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    signup,
    login,
    changePassword
}