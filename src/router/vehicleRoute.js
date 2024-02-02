const router = require("express").Router();
const GyroModel = require("../models/gyro");
const CarModel = require("../models/car");

router.get("/vehicleData", async (req, res) => {
    try {
        const vehicleId = req.query.vehicleNo;

        const selectedVehicle = await GyroModel.find({ vehicleNo: vehicleId });

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

router.get("/fetchvehicleGyroData", async (req, res) => {
    try {
        const req_vhicleNo = req.query.vehicleNo;
        const req_startDate = req.query.startDate;
        const req_endDate = req.query.endDate;

        if (!req_startDate || !req_endDate) {
            return res.json({
                message: "Please provide both startDate and endDate",
                success: false,
                status: 400
            });
        }

        const data = await CarModel.find({ vehicleNo: req_vhicleNo });

        if (data.length > 0) {
            const vehicleNo = data[0].vehicleNo;

            const fetchdata = await GyroModel.find({
                vehicleNo: vehicleNo,
                Date: { $gte: req_startDate, $lte: req_endDate }
            });

            if (fetchdata.length > 0) {
                res.json({
                    message: "Vehicle data fetched successfully",
                    success: true,
                    status: 201,
                    fetchdata
                });
            } else {
                res.json({
                    message: "VehicleNo data not present in GyroModel",
                    success: true,
                    status: 201
                });
            }
        } else {
            res.json({
                message: "Requested data not exist",
                success: true,
                status: 201
            });
        }
    } catch (error) {
        res.json({
            message: error.message
        });
    }
});

router.get("/datevehicleData", async (req, res) => {
    try {
        const vehicleReqData = req.query.vehicleNo;
        const dateReqData = req.query.Date;
        const data = await GyroModel.find({ vehicleNo: vehicleReqData, Date: dateReqData });
        if (!data) {
            return res.json({
                success: false,
                message: "data not exist",
                status: 404
            })
        }
        if (data.length > 0) {
            res.json({
                message: "data fetch successfully",
                status: 201,
                success: true,
                data
            })
        }
    } catch (error) {
        res.json({
            message: error.message
        });
    }
})

module.exports = router;