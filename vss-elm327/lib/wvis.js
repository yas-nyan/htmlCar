const obd2 = require('obd2');
const WebSocketServer = require('ws').Server;
const debug = require("debug")("WVIS");

class Wvis {
    constructor(wsSettings, obd2Settings) {
        /* ws用の設定引数 */
        if (!wsSettings) {
            let wsSettings = {
                port: 8080
            }
        }
        /* obd2用の設定引数 */
        if (!obd2Settings) {
            let obd2Settings = {
                device: "ELM327", // Device type
                serial: "fake", // usb, bluetooth
                port: "/dev/ttyUSB0", // Device COM port / path
                baud: 38400, // Device baud rate
                delay: 50, // Ticker delay time (ms)
                cleaner: true // Automatic ticker list cleaner ( ex. PID not supported, no response )
            };
        }

        //OBD2との接続を行う。
        this.OBD = obd2(obd2Settings);
        this.OBD.start(() => {

        });

        //WSのサーバーを立てる。
        this.server = WebSocketServer(wsSettings);
        this.server.on("connection", (client) => {
            debug("clients connected.")

            client.on("message", (data) => {
                //データを貰ったらreceive送る。
                this.receive(client, data);
            });

            client.on("", (data) => {
                //データを貰ったらreceive送る。
                this.receive(client, data);
            });
        });


    }

    receive(client, reqJSON) {
        //clintにはwsのclient,reqJSONは送らてきたRequestのJSON(未JSON.Parse)が入る。
        try {
            let req = JSON.parse(reqJSON);

        } catch (e) {
            debug("request error. Data format is invailed");
        }
    }

}