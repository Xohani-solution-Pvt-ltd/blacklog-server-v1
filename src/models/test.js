const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    StartCharacter: {
        type: String
    },
    PacketHeader: {
        type: String
    },
    PacketType: {
        type: String
    },
    IMEINumber: {
        type: String
    },
    packetStatus: {
        type: String
    },
    Date: {
        type: String
    }
});

const test = new mongoose.model("Test", testSchema);

module.exports = test;