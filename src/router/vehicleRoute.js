const router = require("express").Router();
const deviceModel = require("../models/gyro");


router.get("/vehicleData", async (req, res) => {
    try {
        const vehicleId = req.query.vehicleNo;

        const selectedVehicle = await deviceModel.find({ vehicleNo: vehicleId });

        if (selectedVehicle.length > 0) {
            res.json({
                success: true,
                message: "vehicle data fetch successfully",
                selectedVehicle,
                status: 200
            })
        } else {
            res.json({
                success: false,
                message: "data not exist",
                status: 400
            })
        }
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

module.exports = router;