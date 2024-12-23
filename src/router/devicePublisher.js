const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker_address'); // Replace with your MQTT broker address

client.on('connect', () => {
    setInterval(() => {
        const deviceData = JSON.stringify({
            vehicleNo: 'device_1',
            GPSfix: 1,
            Date: new Date().toISOString().slice(0, 10),
            Time: new Date().toTimeString().slice(0, 8),
            Latitude: 34.0522,
            LatitudeDirection: 'N',
            Longitude: -118.2437,
            LongitudeDirection: 'W',
            Speed: 60,
            Heading: 90,
            NoOfSatellites: 5,
            Altitude: 30,
            PDOP: 2.5,
            HDOP: 1.5,
            NetworkOperatorName: "OperatorName",
            Ignition: true,
            MainPowerStatus: true,
            MainInputVoltage: 12,
            EmergencyStatus: false,
            GSMSignalStrength: 85,
            MCC: 310,
            MNC: 260,
            LAC: 12345,
            CellId: 67890,
            NMR: 0,
            DigitalInputStatus: 1,
            DigitalOutputStatus: 0,
            acceloX: 0.5,
            acceloY: 0.4,
            acceloZ: 0.6,
            gyroX: 0.1,
            gyroY: 0.1,
            gyroZ: 0.1,
            temperature: 22.5
        });

        client.publish('devices/gyroData/device_1', deviceData);  // Publish data to device-specific topic
        console.log('Data published');
    }, 5000);  // Adjust interval as needed
});
