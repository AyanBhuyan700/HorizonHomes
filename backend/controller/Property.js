import Property from '../models/Property.js';
import path from 'path';
import fs from 'fs';

const uploadPath = path.join("uploadPrty");

// Create Property
export const createProperty = async (req, res) => {
    try {
        const { title, description, price, location, type, bedrooms, bathrooms, area, status, listedBy } = req.body;

        const prtData = await Property.create({
            title,
            description,
            price,
            location,
            type,
            bedrooms,
            bathrooms,
            area,
            status,
            listedBy,
            image: req?.file?.filename || null
        });

        if (prtData) {
            return res.status(201).send({ message: "Property Created" });
        } else {
            return res.status(400).send({ message: "Unable to create property" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

// Update Property
export const updateProperty = async (req, res) => {
    try {
        const { id, title, description, price, location, type, bedrooms, bathrooms, area, status, listedBy } = req.body;

        if (!id) {
            return res.status(400).send({ message: "Property ID is required" });
        }

        const existingProp = await Property.findById(id);
        if (!existingProp) {
            return res.status(404).send({ message: "Property not found" });
        }

        if (req.file && existingProp.image) {
            const oldImagePath = path.join(uploadPath, existingProp.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        const updatedProperty = await Property.findByIdAndUpdate(id, {
            title,
            description,
            price,
            location,
            type,
            bedrooms,
            bathrooms,
            area,
            status,
            listedBy,
            image: req?.file?.filename || existingProp.image,
        }, { new: true });

        if (updatedProperty) {
            return res.status(200).send({ message: "Property Updated" });
        } else {
            return res.status(400).send({ message: "Unable to update property" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

// Delete Property
export const deleteProperty = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).send({ message: "Property ID is required" });
        }

        const existingProp = await Property.findById(id);
        if (!existingProp) {
            return res.status(404).send({ message: "Property not found" });
        }

        if (existingProp.image) {
            const imagePath = path.join(uploadPath, existingProp.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Property.deleteOne({ _id: id });
        return res.status(200).send({ message: "Property Deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

// Get All Properties
export const getAllProperty = async (req, res) => {
    try {
        const prtData = await Property.find().populate("listedBy", "name email");
        res.status(200).send({ prtData });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

// Get Property Details
export const getPropertyDetail = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).send({ message: "Property ID is required" });
        }

        const prtData = await Property.findById(id);
        if (prtData) {
            return res.status(200).send({ prtData });
        } else {
            return res.status(404).send({ message: "Property not found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
};
