process.env.NODE_ENV = "debug";
process.env.DEBUG = "WVIS,OBD2.*";

const obd2 = require('obd2');
const WebSocketServer = require('ws').Server;
const debug = require("debug")("WVIS");

//VSSTree
const VSSTree = require("./vsstree.json");

class Wvis {
    constructor() {
        /* ws用の設定引数 */
        //if (!wsSettings) {
        let wsSettings = {
                port: 8080
            }
            //}
            /* obd2用の設定引数 */
            //if (!obd2Settings) {
        let obd2Settings = {
            device: "ELM327", // Device type
            serial: "fake", // usb, bluetooth
            port: "/dev/ttyUSB0", // Device COM port / path
            baud: 38400, // Device baud rate
            delay: 50, // Ticker delay time (ms)
            cleaner: true // Automatic ticker list cleaner ( ex. PID not supported, no response )
        };
        //}

        //現在subscribeしているRequest
        this.nowSubscribing = {}
        debug(obd2Settings);

        //OBD2との接続を行う。
        this.OBD = new obd2(obd2Settings);
        this.OBD.start(function() {});

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
            let req, path, pid;
            try {
                req = JSON.parse(reqJSON);
                //本当は送られてきたreqのpathが実在してるか確認しなければならない。
                path = req.path;
                pid = eval("VSSTree." + req.path + ".pid");
            } catch (e) {
                debug("request error. Data format is invailed");
                //結果を返送する。
                let returnObj = {
                    "status": "failed"
                }
                client.send(JSON.stringify(returnObj));
                return;
            }



            if (req.action == "get") {

                //getの時
                //単発なのでsendPID
                this.OBD.sendPID(pid, "01", (data) => {
                    //返送用のobj
                    let returnObj = req;

                    //成型する。
                    returnObj.value = {}
                    delete returnObj.path

                    //帰ってきた値を入れる。
                    returnObj.value[path] = data.value;
                    //返送する。
                    client.send(JSON.stringify(returnObj));
                });

            } else
            if (req.action == "subscribe") {
                //subscribeの時
                //連発なのでsendPID
                this.OBD.readPID(pid, "01", (data) => {
                    //返送用のobj
                    let returnObj = req;

                    //成型する。
                    returnObj.value = {}
                    delete returnObj.path

                    //帰ってきた値を入れる。
                    returnObj.value[path] = data.value;
                    //返送する。
                    client.send(JSON.stringify(returnObj));
                });


                //PIDを先に入れておく。
                req["pid"] = pid;
                //登録しておく。
                this.nowSubscribing[req.requestId] = req;

            } else
            if (req.action == "unsubscribe") {

                //もし今回来たRequestが今までにあったものじゃなければ、
                if (!this.nowSubscribing[req.requestId]) {
                    //actionが不正です。
                    debug("request error. Nothing is not able to unsubscribe.");
                    //結果を返送する。
                    let returnObj = {
                        "status": "failed",
                        "requestId": req.requestId
                    }
                    client.send(JSON.stringify(returnObj));
                    return;
                }

                //unsubscribeの時、
                //サブスクライブした時のreq
                let firstReq = this.nowSubscribing[req.requestId];
                //もう決め打ちする他無い
                let targetCmddata = "01" + firstReq.pid + 1 + "\r";
                for (let num in this.OBD.Ticker.commands) {
                    //当てはまるコマンドならデリートする。
                    if (this.OBD.Ticker.commands[num].data == targetCmddata) {
                        this.OBD.Ticker.delItem("PID", targetCmddata);
                    }
                }
                //購読中からこれを消す。
                delete this.nowSubscribing[req.requestId];

                //結果を返送する。
                let returnObj = {
                    "status": "success",
                    "requestId": req.requestId
                }

                client.send(JSON.stringify(returnObj));

            } else if (req.action == "unsubscribeAll") {
                this.OBD.Ticker.stop();
                //結果を返送する。
                let returnObj = {
                    "status": "success",
                    "requestId": req.requestId
                }
            } else {
                //actionが不正です。
                debug("request error. Action is invailed");
                //結果を返送する。
                let returnObj = {
                    "status": "failed",
                    "requestId": req.requestId
                }
                client.send(JSON.stringify(returnObj));
                return;
            }


        }
        /*
                } catch (e) {
                    debug("request error. Data format is invailed");
                    //結果を返送する。
                    let returnObj = {
                        "status": "failed"
                    }
                    client.send(JSON.stringify(returnObj));
                }
                */
}


module.exports = Wvis;