const router = require("express").Router();
const TestModel = require("../models/test");

//POST REQ
router.post("/addTest", async (req, res) => {
    try {
        const data = req.body;
        const testData = new TestModel(data);
        await testData.save().then(() => {
            res.status(200).json({ message: "TestData Added Successfully" });
        })
    } catch (error) {
        console.log(error);
    }
})

// GET REQ
router.get("/fetchTest", async (req, res) => {
    try {
        const data = await TestModel.find();
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
