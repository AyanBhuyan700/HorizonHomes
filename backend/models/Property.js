import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["apartment", "house", "office", "villa"],
        default: "apartment",
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    listedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    status: {
        type: String,
        enum: ["rent", "sale"],
        default: "sale"
    },
}, { timestamps: true })

const Property = mongoose.model('property', PropertySchema)
export default Property

