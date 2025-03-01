import User from '../models/User.js'
import { generateToken } from '../utils/generateToken.js'
import bcrypt from 'bcrypt'

export const registerUser = async (req, res) => {
    try {
        let { name, email, password, role } = req.body
        let user = await User.findOne({ email: email })
        if (user) {
            res.status(400).send({ message: 'User already exists' })
        }
        else {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, async function (err, hash) {
                    const newUser = await User.create({
                        name,
                        email,
                        password: hash

                    })
                    let token = generateToken(newUser)
                    res.cookie("token", token)
                    res.send(newUser)
                });
            });
        }
    } catch (err) {
        res.status(400).send({ message: 'Something went wrong' })
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        });

        return res.json({ id: user._id, role: user.role });

    } catch (error) {
        console.error("Login Error:", error.message);
        return res.status(500).json({ message: "Server error, please try again" });
    }
};
