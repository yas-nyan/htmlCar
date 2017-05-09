class Vehicle {
    constructor(host, port) {
        this.uri = "ws://" + host + ":" + port;
        this.ws = new WebSocket(this.uri);


        this.vehicleSpeed = new VehicleSignalInterface(this.ws, 'Signal.Drivetrain.Transmission.Speed');
        this.engineSpeed = new VehicleSignalInterface(this.ws, 'Signal.Drivetrain.InternalCombustionEngine.RPM');
        this.MAF = new VehicleSignalInterface(this.ws, 'Signal.Drivetrain.InternalCombustionEngine.MAF');
    }

    unsubscribeAll() {
        return new Promise((resolve, reject) => {
            this.ws.addEventListener("message", function(event) {
                if (event.status == 'failes') {
                    reject();
                } else {
                    resolve(JSON.parse(event.data));
                }

            });
            this.ws.send(`{"action": "unsubscribeAll","path":"Signal.Drivetrain.Transmission.Speed","requestId": "${genUUID()}"}`)
        });

    }


}

class VehicleSignalInterface {
    constructor(ws, path) {
        this.ws = ws;
        this.path = path;
        this.subscribeUuid = "";
        this.getId = "";
        //subscribeの有無
        this.isSubscribed = false;

    }

    get() {
        this.getId = genUUID();
        return new Promise((resolve, reject) => {
            this.ws.addEventListener("message", (event)=> {
                //ここではこのインターフェース全体のWSにイベントを追加している。そのため、他の要素が来てもこのイベントが呼ばれてしまう。
                //この問い合わせじゃなかったらパスする。
                if (this.getId != JSON.parse(event.data)["requestId"]){
                    return
                }                          
                if (event.status == 'failes') {
                    reject();
                } else {
                    resolve(JSON.parse(event.data));
                    //このイベントを取り除く
                    this.ws.removeEventListener("message", event);

                }

            });
            this.ws.send(`{"action": "get", "path": "${this.path}", "requestId": "${this.getId}"}`)

        });


    }

    subscribe(callback) {
        //もしすでにsubscribeされていたら拒否する。
        if(this.isSubscribed == true){
            return
        }
        this.subscribeId = genUUID();
        this.ws.addEventListener("message", (event) => {
            //この問い合わせじゃなかったらパスする。
            if (this.subscribeId != JSON.parse(event.data)["requestId"]){
                return
            }
             if (event.status == 'failes') {

            } else {
                callback(JSON.parse(event.data));
                //このイベントを登録しておく(同じ要素で複数のsubscribeを許さない)
                if(!this.isSubscribed){
                    this.subscribeEvent = event;
                    //この要素がsubscribeされてる時はtrueにする。
                    this.isSubscribed = true;
                }

            }

        });
        this.ws.send(`{"action": "subscribe", "path": "${this.path}", "requestId": "${this.subscribeId}"}`);

    }

    unsubscribe() {
        return new Promise((resolve, reject) => {
            this.ws.addEventListener("message", (event)=> {
                if (event.status == 'failes') {
                    reject();
                } else {
                    resolve(JSON.parse(event.data));
                    //まずこのイベントを取り除く
                    this.ws.removeEventListener("message", event);
                    //subscribeのeventも取り除く
                    this.ws.removeEventListener("message", this.subscribeEvent);
                    //この要素がsubscribeされてない時はfalseにする。
                    this.isSubscribed = false;
                    
                }

            });
            this.ws.send(`{"action": "unsubscribe", "path": "${this.path}", "requestId": "${this.subscribeId}"}`)

        });
    }
}


function genUUID() {
    var uuid = "",
        i, random;
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;

        if (i == 8 || i == 12 || i == 16 || i == 20) {
            uuid += "-"
        }
        uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;

}