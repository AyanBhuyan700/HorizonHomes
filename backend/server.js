import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import paymentRoutes from './routes/PaymentRoute.js'
import { loginUser, registerUser } from './controller/User.js'
import { createProperty, deleteProperty, getAllProperty, getPropertyDetail, updateProperty } from './controller/Property.js'
dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())
app.use(express.static("uploadPrty"))
app.use("/api/payment", paymentRoutes);


//Property Module
const storagePrty = multer.diskStorage({
    destination: 'uploadPrty/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
    }
})
const uploadPrty = multer({ storage: storagePrty });

try {
    app.post("/property", uploadPrty.single("image"), createProperty)
    app.put("/property", uploadPrty.single("image"), updateProperty)
    app.delete("/property", deleteProperty)
    app.get("/property", getAllProperty)
    app.get("/propertyDetail", getPropertyDetail)
} catch (err) {
    console.log(err.message);

}


//Register and Login
try {
    app.post('/register', registerUser)
    app.post('/login', loginUser)
} catch (err) {
    console.log(err.message);
}


//Database Connection
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("connected");
    app.listen(process.env.PORT)
}).catch((err) => {
    console.log(err.message);
})