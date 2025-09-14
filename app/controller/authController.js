const User = require('../model/user');
const { hashedPassword, comparePassword } = require('../helper/hashedPassword');
const jwt = require('jsonwebtoken');
class AuthController {
    async Register(req, res) {
        //console.log(req.body);

        try {
            const { name, email, password, phone } = req.body;
            if (!name || !email || !password || !phone) {
                return res.status(400).json({ message: "All fields are required" })
            }
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" })
            }
            const hashpassword = await hashedPassword(password)
            const userdata = new User({
                name,
                email,
                password: hashpassword,
                phone
            })
            const data = await userdata.save();
            return res.status(201).json({
                message: "User registered successfully",
                data: data
            })

        } catch (error) {
            console.log('error', error.message);

            return res.status(500).json({ message: "Internal server error" })

        }
    }

    async Login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "All fields are required" })
            }
            const existingUser = await User.findOne({ email });
            console.log('existingUser', existingUser);
            if (!existingUser) {
                return res.status(400).json({ message: "Email doesn`t exist" })
            }
            const isMatch = await comparePassword(password, existingUser.password)
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" })
            }
            const token = jwt.sign({
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                phone: existingUser.phone,
            }, process.env.JWT_SECRET, { expiresIn: '1h' })

            return res.status(200).json({
                message: "User logged in successfully",
                token: token,
                user: {
                    name: existingUser.name,
                    email: existingUser.email,
                    phone: existingUser.phone,
                }
            })

        } catch (error) {
            console.log('error', error.message);
            return res.status(500).json({ message: "Internal server error" })
        }
    }

    async Dashboard(req, res) {
        return res.status(200).json({ message: "Welcome to the dashboard",data:req.user })
    }
}

module.exports = new AuthController();