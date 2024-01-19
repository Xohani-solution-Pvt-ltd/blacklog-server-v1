const router = require("express").Router();
const CarModel = require("../models/car");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/carImage'), function (error) {
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

const upload = multer({ storage: storage });

router.post("/addCar", upload.single("image"), async (req, res) => {
    try {
        const { model, vehicleNo, year } = req.body
        const imagePath = req.file ? req.file.path : null;
        const car = await CarModel.findOne({ vehicleNo });

        if (car) {
            return res.json({
                error: "Car Allready Exist"
            }, { status: 201 })
        }

        const data = new CarModel({
            model, vehicleNo, year,
            image: imagePath
        });

        const savedData = await data.save();
        return res.json({
            message: "Car Added SuccessFully",
            success: true,
            savedData
        })
    } catch (error) {
        res.status(404).send({ success: false, msg: error.message });

    }
})

router.get("/fetchCar", async (req, res) => {
    try {
        const data = await CarModel.find();
        if (!data) {
            return res.json({
                message: "Car Details Not Exist"
            }, { status: 400 });
        }
        return res.json({
            message: "Car Details Fetch successFully",
            status: 200,
            data
        })
    } catch (error) {
        res.json({
            message: error.massage
        })
    }
})
router.get("/fetchsingleCar", async (req, res) => {
    try {
        const req_Data = req.query.vehicleNo;
        const vehicleData = await CarModel.find({ vehicleNo: req_Data });
        console.log("dataofvehicle", req_Data);
        if (vehicleData) {
            res.json({
                message: "vehicle data fetched successfully",
                success: true,
                status: 201,
                vehicleData
            })
        } else {
            res.json({
                success: false,
                status: 404,
                message: "Data not fetched "
            })
        }
    } catch (error) {
        res.json({
            message: error.massage
        })
    }
})

module.exports = router;