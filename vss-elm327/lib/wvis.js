const obd2 = require('obd2');
const WebSocketServer = require('ws').Server;
const debug = require("debug")("WVIS");

//VSSTree
const VSSTree = require()

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

            client.on("error", (data) => {
                debug("connection error.");
                this.server.close();
            });
        });


    }

    receive(client, reqJSON) {
        //clintにはwsのclient,reqJSONは送らてきたRequestのJSON(未JSON.Parse)が入る。
        try {
            let req = JSON.parse(reqJSON);

            //actionの種類によって分類
            switch (req.action) {
                case "get":
                    //getの時



                case "subscribe":
                    //subscribeの時


                case "unsubscribe":
                    //unsubscribeの時



            }

        } catch (e) {
            debug("request error. Data format is invailed");
        }
    }

}