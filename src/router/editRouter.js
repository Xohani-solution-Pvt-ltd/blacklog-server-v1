const router = require("express").Router();
const EditModel = require("../models/editDriver");
const multer = require('multer')
const path = require('path');
const CarModel = require('../models/car');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/userImage'), function (error) {
            if (error) throw error
        })
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name, function (error, success) {
            if (error) throw error
        })
    }
})

const upload = multer({ storage: storage })

router.post("/addDriver", upload.single("image"), async (req, res) => {

    try {
        const { name, mobile, emergencyContact, dateOfBirth, licenseNo, address, vehicleNo } = req.body;
        const imagePath = req.file ? req.file.path : null;

        const carDetails = await CarModel.findOne({ vehicleNo });

        if (!carDetails) {
            return res.json({
                error: "Car Not Exist"
            }, { status: 400 })
        };

        const user = await EditModel.findOne({ licenseNo }, { mobile });

        if (user) {
            return res.json({
                error: "Driver Allready Exist..."
            }, { status: 400 })
        }
        const userData = new EditModel({
            name, mobile, dateOfBirth, address, licenseNo,
            image: imagePath, emergencyContact,
            car: carDetails._id
        })
        const response = await userData.save();

        return res.json({
            success: true,
            message: "Driver Profile Created Successfully...",
            response
        })

    } catch (error) {
        res.status(404).send({ success: false, msg: error.message });
    }
})

router.get("/fetchDriver", async (req, res) => {
    try {
        const data = await EditModel.find();
        if (!data) {
            return res.json({
                message: "Driver Details Not Exist"
            }, { status: 400 });
        }
        return res.json({
            message: "Driver Details Fetch successFully",
            status: 200,
            data
        })
    } catch (error) {
        res.json({
            message: error.massage
        })
    }
})


module.exports = router;