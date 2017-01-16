/**
 * WVIS-ELM327
 * W3C Vehicle API
 * 
 * Yasunobu Toyota
 * https://github.com/yas-nyan/
 * 
 * 
 * This is develop edition. 
 */

const obd2 = require('obd2');
const WebSocketServer = require('ws').Server;
const server = new WebSocketServer({
    port: 8080
});
var OBD = new obd2({
    device: "ELM327", // Device type
    serial: "fake", // usb, bluetooth
    port: "COM6", // Device COM port / path
    baud: 38400, // Device baud rate
    delay: 50, // Ticker delay time (ms)
    cleaner: true // Automatic ticker list cleaner ( ex. PID not supported, no response )
});


server.on('connection', function(client) {

    //メッセージが来た時
    client.on('message', function(data) {
        //dataにはJSONファイルが入るはず。解釈する。
        try {
            JSON.parse(data)
        } catch (e) {

        }
    });
});